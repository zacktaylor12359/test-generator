from flask import Flask, request, send_file, send_from_directory, jsonify
from pathlib import Path
from docx import Document
from docx.shared import Inches, Pt
from docx.enum.text import WD_ALIGN_PARAGRAPH
import os
import zipfile
import random
app = Flask(__name__)


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

    doc = Document()

    # generate header
    section = doc.sections[0]
    section.different_first_page_header_footer = True
    header = section.first_page_header
    header_para = header.paragraphs[0]
    header_para.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    header_run = header_para.add_run()
    header_font = header_run.font
    header_font.size = Pt(12)
    header_font.name = 'Helvetica'

    header_run.text = "" \
        "Name: \n" \
        "Date: \n" \
        "Section: "

    # generate title
    title_para = doc.add_paragraph()
    title_para.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    title_para.paragraph_format.space_before = Pt(12)
    title_para.paragraph_format.space_after = Pt(12)
    title_run = title_para.add_run()
    title_font = title_run.font
    title_font.name = 'Helvetica'
    title_font.size = Pt(20)
    title_font.bold = True

    title_run.text = "Exam 3: Thing"

    # generate instructions
    instructions_para = doc.add_paragraph()
    instructions_para.paragraph_format.space_after = Pt(40)
    instructions_run = instructions_para.add_run()
    instructions_font = instructions_run.font
    instructions_font.name = 'Helvetica'
    instructions_font.size = Pt(12)

    instructions_run.text = "" \
        "Instructions: Lorem ipsum dolor sit amet, consectetur adipiscing elit, " \
        "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim " \
        "henderit in voluptate velit esse cillum dolore eu fugiat nulla paria"

    # geneate section loop
    TMP_SECTION_INDEX = 4
    TMP_QUESTION_INDEX = 10
    for i in range(TMP_SECTION_INDEX):
        # generate section title
        section_title_para = doc.add_paragraph()
        section_title_para.paragraph_format.space_before = Pt(20)
        section_title_para.paragraph_format.space_after = Pt(6)
        section_title_run = section_title_para.add_run()
        section_title_font = section_title_run.font
        section_title_font.name = 'Helvetica'
        section_title_font.size = Pt(12)
        section_title_font.bold = True

        section_title_run.text = "section " + f"{i + 1}"

        # generate section instructions
        section_instructions_para = doc.add_paragraph()
        section_instructions_para.paragraph_format.space_before = Pt(6)
        section_instructions_para.paragraph_format.space_after = Pt(10)
        section_instructions_run = section_instructions_para.add_run()
        section_instructions_font = section_instructions_run.font
        section_instructions_font.name = 'Helvetica'
        section_instructions_font.size = Pt(12)

        section_instructions_run.text = "rem ipsum dolor sit amet, consectetur " \
            "adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna"

        # generate questions
        for j in range(TMP_QUESTION_INDEX):
            question_para = doc.add_paragraph()
            question_para.paragraph_format.space_before = Pt(12)
            question_para.paragraph_format.space_after = Pt(12)
            question_run = question_para.add_run()
            question_font = question_run.font
            question_font.name = 'Helvetica'
            question_font.size = Pt(12)
            question_run.text = f"Question {j + 1} \n" \
                "_______________"

    testPath = Path.home() / 'Tests'
    answerPath = Path.home() / 'AnswerKeys'

    if(not(os.path.isdir(testPath))):
        os.mkdir(testPath)

    if(not(os.path.isdir(answerPath))):
        os.mkdir(answerPath)

    os.chdir(testPath)
    doc.save('demo.docx')

    os.chdir(Path.home())
    return (
        send_file(
            testPath / 'demo.docx',
            mimetype='docx',
            download_name='Test.docx',
            as_attachment=True
        )
    )


if __name__ == '__main__':
    port = os.environ.get("PORT", 4000)
    app.run(debug=True, host='0.0.0.0', port=port)
