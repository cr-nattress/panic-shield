import { EmotionData } from './storage/secureStorage';
import { EMOTION_CORES, SUB_EMOTIONS } from './emotionDataEnhanced';

interface ExportData {
  version: string;
  exportDate: string;
  user: {
    id?: string;
    createdAt?: string;
  };
  emotions: EmotionData[];
  statistics: {
    totalLogs: number;
    dateRange: {
      from: string;
      to: string;
    };
    emotionFrequency: Record<string, number>;
    averageIntensity: number;
    topTriggers: string[];
  };
  achievements?: string[];
}

// Export data as JSON
export function exportAsJSON(data: EmotionData[], achievements: string[] = []): string {
  const exportData = prepareExportData(data, achievements);
  return JSON.stringify(exportData, null, 2);
}

// Export data as CSV
export function exportAsCSV(data: EmotionData[]): string {
  if (data.length === 0) return '';

  // Headers
  const headers = [
    'Date',
    'Time',
    'Emotion',
    'Category',
    'Intensity',
    'Triggers',
    'Notes'
  ];

  // Map emotion data to rows
  const rows = data.map(log => {
    const date = new Date(log.timestamp || Date.now());
    const emotion = findEmotionName(log.emotionId);
    const category = findEmotionCategory(log.emotionId);

    return [
      date.toLocaleDateString(),
      date.toLocaleTimeString(),
      emotion,
      category,
      log.intensity?.toString() || '',
      (log.triggers || []).join('; '),
      log.notes || ''
    ];
  });

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row =>
      row.map(cell =>
        // Escape commas and quotes in cell content
        `"${String(cell).replace(/"/g, '""')}"`
      ).join(',')
    )
  ].join('\n');

  return csvContent;
}

// Generate markdown report
export function exportAsMarkdown(data: EmotionData[], achievements: string[] = []): string {
  const exportData = prepareExportData(data, achievements);

  let markdown = `# Emotion Tracking Report\n\n`;
  markdown += `**Generated:** ${new Date().toLocaleString()}\n`;
  markdown += `**Total Logs:** ${exportData.statistics.totalLogs}\n`;
  markdown += `**Period:** ${exportData.statistics.dateRange.from} to ${exportData.statistics.dateRange.to}\n\n`;

  // Statistics section
  markdown += `## Statistics\n\n`;
  markdown += `### Emotion Frequency\n\n`;
  markdown += `| Emotion | Count | Percentage |\n`;
  markdown += `|---------|-------|------------|\n`;

  const total = exportData.statistics.totalLogs;
  Object.entries(exportData.statistics.emotionFrequency)
    .sort(([, a], [, b]) => b - a)
    .forEach(([emotion, count]) => {
      const percentage = ((count / total) * 100).toFixed(1);
      markdown += `| ${emotion} | ${count} | ${percentage}% |\n`;
    });

  markdown += `\n**Average Intensity:** ${exportData.statistics.averageIntensity.toFixed(1)}/10\n\n`;

  // Top triggers
  if (exportData.statistics.topTriggers.length > 0) {
    markdown += `### Top Triggers\n\n`;
    exportData.statistics.topTriggers.forEach((trigger, index) => {
      markdown += `${index + 1}. ${trigger}\n`;
    });
    markdown += '\n';
  }

  // Achievements
  if (achievements.length > 0) {
    markdown += `## Achievements Unlocked\n\n`;
    achievements.forEach(achievement => {
      markdown += `- 🏆 ${achievement}\n`;
    });
    markdown += '\n';
  }

  // Recent logs
  markdown += `## Recent Emotion Logs\n\n`;
  const recentLogs = data.slice(-10).reverse();

  recentLogs.forEach(log => {
    const date = new Date(log.timestamp || Date.now());
    const emotion = findEmotionName(log.emotionId);

    markdown += `### ${date.toLocaleString()}\n`;
    markdown += `- **Emotion:** ${emotion}\n`;
    markdown += `- **Intensity:** ${log.intensity}/10\n`;

    if (log.triggers && log.triggers.length > 0) {
      markdown += `- **Triggers:** ${log.triggers.join(', ')}\n`;
    }

    if (log.notes) {
      markdown += `- **Notes:** ${log.notes}\n`;
    }

    markdown += '\n';
  });

  return markdown;
}

// Download file helper
export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();

  // Cleanup
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
}

// Export functions for different formats
export function exportEmotionsAsJSON(data: EmotionData[], achievements: string[] = []) {
  const content = exportAsJSON(data, achievements);
  const filename = `emotions_${new Date().toISOString().split('T')[0]}.json`;
  downloadFile(content, filename, 'application/json');
}

export function exportEmotionsAsCSV(data: EmotionData[]) {
  const content = exportAsCSV(data);
  const filename = `emotions_${new Date().toISOString().split('T')[0]}.csv`;
  downloadFile(content, filename, 'text/csv');
}

export function exportEmotionsAsMarkdown(data: EmotionData[], achievements: string[] = []) {
  const content = exportAsMarkdown(data, achievements);
  const filename = `emotions_report_${new Date().toISOString().split('T')[0]}.md`;
  downloadFile(content, filename, 'text/markdown');
}

// Helper functions
function prepareExportData(data: EmotionData[], achievements: string[] = []): ExportData {
  const sortedData = [...data].sort((a, b) =>
    new Date(a.timestamp || 0).getTime() - new Date(b.timestamp || 0).getTime()
  );

  const dateRange = {
    from: sortedData.length > 0
      ? new Date(sortedData[0].timestamp || Date.now()).toLocaleDateString()
      : 'N/A',
    to: sortedData.length > 0
      ? new Date(sortedData[sortedData.length - 1].timestamp || Date.now()).toLocaleDateString()
      : 'N/A'
  };

  // Calculate emotion frequency
  const emotionFrequency: Record<string, number> = {};
  let totalIntensity = 0;
  const triggerFrequency: Record<string, number> = {};

  sortedData.forEach(log => {
    const emotionName = findEmotionName(log.emotionId);
    emotionFrequency[emotionName] = (emotionFrequency[emotionName] || 0) + 1;

    totalIntensity += log.intensity || 0;

    (log.triggers || []).forEach(trigger => {
      triggerFrequency[trigger] = (triggerFrequency[trigger] || 0) + 1;
    });
  });

  const topTriggers = Object.entries(triggerFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([trigger]) => trigger);

  return {
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    user: {
      createdAt: sortedData.length > 0 ? sortedData[0].timestamp : undefined
    },
    emotions: sortedData,
    statistics: {
      totalLogs: sortedData.length,
      dateRange,
      emotionFrequency,
      averageIntensity: sortedData.length > 0 ? totalIntensity / sortedData.length : 0,
      topTriggers
    },
    achievements
  };
}

function findEmotionName(emotionId: string): string {
  // Check core emotions
  const coreEmotion = EMOTION_CORES.find(e => e.id === emotionId);
  if (coreEmotion) return coreEmotion.name;

  // Check sub-emotions
  const subEmotion = SUB_EMOTIONS.find(e => e.id === emotionId);
  if (subEmotion) return subEmotion.name;

  return 'Unknown';
}

function findEmotionCategory(emotionId: string): string {
  // Check if it's a core emotion
  const coreEmotion = EMOTION_CORES.find(e => e.id === emotionId);
  if (coreEmotion) return coreEmotion.name;

  // Find parent category for sub-emotion
  const subEmotion = SUB_EMOTIONS.find(e => e.id === emotionId);
  if (subEmotion) {
    const parent = EMOTION_CORES.find(e => e.id === subEmotion.coreId);
    if (parent) return parent.name;
  }

  return 'Other';
}