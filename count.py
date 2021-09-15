"""
Basic test file, artificially increasing the local count file
 and uploading it to the ledger. 
This is because I do not have the cirucits to test the other script.
"""

import sys,os,json,subprocess

countFile = 'count.txt'
def getCount():
    if not os.path.isfile(countFile):
        return 0
    else:
        try:
            return int(open(countFile).read())
        except ValueError:
            print("Error, the count file is corrupt. Resetting to zero.")
            return 0
    
def setCount(myCount,limit=5):
    #Update local file
    if not os.path.isfile(countFile):
        open(countFile,'w+').write(0)
    open(countFile,'w+').write(str(myCount))
    
    #Upload to iota ledger
    if myCount >= limit:
        uploadCount()

def uploadCount():
    subprocess.run(['node', 'gateway.js'])

if __name__=="__main__":
    count = getCount()
    print(f'Count is {count}, increasing')
    setCount(count+1)
    print("Count set")
    
