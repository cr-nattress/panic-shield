import unittest
from pathlib import Path
import tempfile

from agents.code_quality import scanner, complexity

PY_SNIPPET = """
# sample python

def foo(x):
    if x > 0:
        return x
    return -x
"""

JS_SNIPPET = """
// sample js
function bar(y) {
  if (y > 0) {
    return y;
  }
  return -y;
}
"""

class TestCodeQualityScanner(unittest.TestCase):
    def test_scan_directory_counts(self):
        with tempfile.TemporaryDirectory() as td:
            td_path = Path(td)
            (td_path / "a.py").write_text(PY_SNIPPET, encoding="utf-8")
            (td_path / "b.js").write_text(JS_SNIPPET, encoding="utf-8")
            data = scanner.scan_directory(td_path)
            agg = data["aggregate"]
            self.assertEqual(agg["files"], 2)
            self.assertGreater(agg["total_lines"], 0)
            self.assertGreaterEqual(agg["functions"], 2)

    def test_complexity_directory(self):
        with tempfile.TemporaryDirectory() as td:
            td_path = Path(td)
            (td_path / "a.py").write_text(PY_SNIPPET, encoding="utf-8")
            (td_path / "b.js").write_text(JS_SNIPPET, encoding="utf-8")
            data = complexity.analyze_directory(td_path)
            agg = data["aggregate"]
            self.assertEqual(agg["files"], 2)
            self.assertGreaterEqual(agg["functions"], 2)
            self.assertGreater(agg["total_complexity"], 0)

if __name__ == '__main__':
    unittest.main()
