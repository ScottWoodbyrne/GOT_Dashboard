import unittest
import GOTData


class test_GOTData(unittest.TestCase):

    def testCanGetDataChar(self):
        self.assertNotEqual(GOTData.GOTChar, "")

    def testCanGetDataBattles(self):
        self.assertNotEqual(GOTData.GOTBat, "")
