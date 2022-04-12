from flask import Flask, request, send_file, send_from_directory, jsonify
from pathlib import Path
from docx import Document
import os
import zipfile
import random
app = Flask(__name__)

document = Document()


def change(amount):
    # calculate the resultant change and store the result (res)
    res = []
    coins = [1, 5, 10, 25]  # value of pennies, nickels, dimes, quarters
    coin_lookup = {25: "quarters", 10: "dimes", 5: "nickels", 1: "pennies"}

    # divide the amount*100 (the amount in cents) by a coin value
    # record the number of coins that evenly divide and the remainder
    coin = coins.pop()
    num, rem = divmod(int(amount*100), coin)
    # append the coin type and number of coins that had no remainder
    res.append({num: coin_lookup[coin]})

    # while there is still some remainder, continue adding coins to the result
    while rem > 0:
        coin = coins.pop()
        num, rem = divmod(rem, coin)
        if num:
            if coin in coin_lookup:
                res.append({num: coin_lookup[coin]})
    return res


@app.route('/')
def hello():
    """Return a friendly HTTP greeting."""
    print("I am ihello world")
    return 'I make change and route /change'


@app.route('/change/<dollar>/<cents>')
def changeroute(dollar, cents):
    print(f"Make Change for {dollar}.{cents}")
    amount = f"{dollar}.{cents}"
    result = change(float(amount))
    return jsonify(result)


@app.route('/thing')
def testroute():
    document = Document()
    document.add_heading('Document Title', 9)

    # data = request.get_json()
    # questions = data['questionList']
    testPath = Path.home() / 'Tests'
    answerPath = Path.home() / 'AnswerKeys'

    if(not(os.path.isdir(testPath))):
        os.mkdir(testPath)

    # if(not(os.path.isdir(answerPath))):
    #     os.mkdir(answerPath)

<<<<<<< HEAD
    # testStr = ('Test' + '.doc')
    # answerStr = ('AnswerKey' + '.doc')
    # testFile = open(testPath / testStr, 'w+')
    # answerFile = open(answerPath / answerStr, 'w+')
    # answerFile.write('ANSWER KEY (FORM1)\n')
    # testFile.write('Name:\n\n\nDate:\n\n\nPeriod:\n\n\nState Capitals Quiz (Form1)\n\n\n')
    # random.shuffle(questions)   

    # for j in range(50):
    #     rand = random.randint(0, 3)
    #     answerFile.write(str(j + 1) + '. ' + chr(65 + rand) + '\n')
    #     testFile.write(str(j + 1) + '. What is the capital of ' + questions[j]["state"] + '?\n\n') 
    #     for k in range(4):
    #         if(k == rand):
    #             option = questions[j]["capital"]
    #         else:
    #             rand2 = random.randint(0, 49)

    #             while(rand2 == j):
    #                 rand2 = random.randint(0, 49)
                
    #             option = questions[rand2]["capital"]
    #         testFile.write(chr(65 + k) + '. ' + option + '\n\n') 
        
    #     testFile.write('\n\n\n')
=======
    testStr = ('Test' + '.doc')
    answerStr = ('AnswerKey' + '.doc')
    testFile = open(testPath / testStr, 'w+')
    answerFile = open(answerPath / answerStr, 'w+')
    answerFile.write('ANSWER KEY (FORM1)\n')
    testFile.write(
        'Name:\n\n\nDate:\n\n\nPeriod:\n\n\nState Capitals Quiz (Form1)\n\n\n')
    random.shuffle(questions)

    for j in range(50):
        rand = random.randint(0, 3)
        answerFile.write(str(j + 1) + '. ' + chr(65 + rand) + '\n')
        testFile.write(str(j + 1) + '. What is the capital of ' +
                       questions[j]["state"] + '?\n\n')
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
>>>>>>> e788b8dec4a37872ff35ac101a7c9cc00c8c21cc

        document.save(testPath / 'demo.docx')
    return (
        send_file(
<<<<<<< HEAD
        testPath / 'demo.docx', 
        mimetype = 'doc', 
        attachment_filename = 'Test.doc', 
        as_attachment = True
=======
            Path.home() / 'Tests' / 'Test1.doc',
            mimetype='doc',
            attachment_filename='Test.doc',
            as_attachment=True
>>>>>>> e788b8dec4a37872ff35ac101a7c9cc00c8c21cc
        )
    )


if __name__ == '__main__':
    port = os.environ.get("PORT", 4000)
    app.run(debug=True, host='0.0.0.0', port=port)
