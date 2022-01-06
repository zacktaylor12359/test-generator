import shelve
import os
import random
from pathlib import Path

def shuffleInt(randInt):
    return randInt

questions = [
    {'state':'Alabama', 'capital':'Montgomery'}, 
    {'state':'Alaska', 'capital':'Juneau'},
    {'state':'Arizona', 'capital':'Phoenix'}, 
    {'state':'Arkansas', 'capital':'Little Rock'},
    {'state':'California', 'capital':'Sacramento'}, 
    {'state':'Colorado', 'capital':'Denver'},
    {'state':'Connecticut', 'capital':'Hartford'}, 
    {'state':'Delaware', 'capital':'Dover'},
    {'state':'Florida', 'capital':'Tallahassee'}, 
    {'state':'Georgia', 'capital':'Atlanta'},
    {'state':'Hawaii', 'capital':'Honolulu'}, 
    {'state':'Idaho', 'capital':'Boise'},
    {'state':'Illinois', 'capital':'Springfield'}, 
    {'state':'Indiana', 'capital':'Indianapolis'},
    {'state':'Iowa', 'capital':'Des Moines'}, 
    {'state':'Kansas', 'capital':'Topeka'},
    {'state':'Kentucky', 'capital':'Frankfort'}, 
    {'state':'Louisiana', 'capital':'Baton Rouge'},
    {'state':'Maine', 'capital':'Augusta'}, 
    {'state':'Maryland', 'capital':'Annapolis'},
    {'state':'Massachusetts', 'capital':'Boston'}, 
    {'state':'Michigan', 'capital':'Lansing'},
    {'state':'Minnesota', 'capital':'Saint Paul'}, 
    {'state':'Mississippi', 'capital':'Jackson'},
    {'state':'Missouri', 'capital':'Jefferson City'}, 
    {'state':'Montana', 'capital':'Helena'},
    {'state':'Nebraska', 'capital':'Lincoln'}, 
    {'state':'Nevada', 'capital':'Carson City'},
    {'state':'New Hampshire', 'capital':'Concord'}, 
    {'state':'New Jersey', 'capital':'Trenton'},
    {'state':'New Mexico', 'capital':'Santa Fe'}, 
    {'state':'New York', 'capital':'Albany'},
    {'state':'North Carolina', 'capital':'Raleigh'}, 
    {'state':'North Dakota', 'capital':'Bismarck'},
    {'state':'Ohio', 'capital':'Columbus'}, 
    {'state':'Oklahoma', 'capital':'Oklahoma City'},
    {'state':'Oregon', 'capital':'Salem'}, 
    {'state':'Pennsylvania', 'capital':'Harrisburg'},
    {'state':'Rhode Island', 'capital':'Providence'}, 
    {'state':'South Carolina', 'capital':'Columbia'},
    {'state':'South Dakota', 'capital':'Pierre'}, 
    {'state':'Tennessee', 'capital':'Nashville'},
    {'state':'Texas', 'capital':'Austin'}, 
    {'state':'Utah', 'capital':'Salt Lake City'},
    {'state':'Vermont', 'capital':'Montpelier'}, 
    {'state':'Virginia', 'capital':'Richmond'},
    {'state':'Washington', 'capital':'Olympia'}, 
    {'state':'West Virginia', 'capital':'Charleston'},
    {'state':'Wisconsin', 'capital':'Madison'}, 
    {'state':'Wyoming', 'capital':'Cheyenne'},
]

testPath = Path.home() / 'Desktop' / 'Tests'
answerPath = Path.home() / 'Desktop' / 'Answer Keys'

if(not(os.path.isdir(testPath))):
    os.mkdir()

if(not(os.path.isdir(answerPath))):
    os.mkdir()

for i in range(35):
    testStr = ('Test' + str(i + 1) + '.doc')
    answerStr = ('Answer key ' + str(i + 1) + '.doc')
    testFile = open(testPath / testStr, 'w+')
    answerFile = open(answerPath / answerStr, 'w+')
    answerFile.write('ANSWER KEY (FORM ' + str(i + 1) + ')\n')
    testFile.write('Name:\n\n\nDate:\n\n\nPeriod:\n\n\nState Capitals Quiz (Form ' + str(i+1) + ')\n\n\n')
    random.shuffle(questions)   

    for j in range(50):
        rand = random.randint(0, 3)
        answerFile.write(str(j + 1) + '. ' + chr(65 + rand) + '\n')
        testFile.write(str(j + 1) + '. What is the capital of ' + questions[j]["state"] + '?\n\n') 
        for k in range(4):
            if(k == rand):
                option = questions[j]["capital"]
            else:
                rand2 = random.randint(0, 49)

                while(rand2 == j):
                    rand2 = random.randint(0, 49)
                
                option = questions[rand2]["capital"]
            testFile.write(chr(65 + k) + '. ' + option + '\n\n') 
        
        testFile.write('\n\n\n')
    
