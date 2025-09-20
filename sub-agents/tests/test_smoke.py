import unittest
import importlib

class SmokeTest(unittest.TestCase):
    def test_orchestrator_runs(self):
        orch = importlib.import_module('orchestrator')
        rc = orch.main([])
        self.assertEqual(rc, 0)

if __name__ == '__main__':
    unittest.main()
