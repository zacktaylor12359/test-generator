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
    # heroku test 2
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


@app.route('/thing', methods=['POST'])
def testroute():
    # assigning request json to variables
    test = request.get_json()
    has_header = test['header']
    has_title = test['title']
    has_instructions = test['instructions']
    section = test['section']

    # document object
    doc = Document()

    # generate header
    if has_header == True:
        header_left_alignment = test['header_left_alignment']
        header_text = test['entered_header']

        doc_settings = doc.sections[0]
        doc_settings.different_first_page_header_footer = True
        header = doc_settings.first_page_header
        header_para = header.paragraphs[0]
        if header_left_alignment == False:
            header_para.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        header_run = header_para.add_run()
        header_font = header_run.font
        header_font.size = Pt(12)
        header_font.name = 'Helvetica'

        header_run.text = header_text

    # generate title
    if has_title == True:
        title_text = test['entered_title']

        title_para = doc.add_paragraph()
        title_para.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
        title_para.paragraph_format.space_before = Pt(12)
        title_para.paragraph_format.space_after = Pt(12)
        title_run = title_para.add_run()
        title_font = title_run.font
        title_font.name = 'Helvetica'
        title_font.size = Pt(20)
        title_font.bold = True

        title_run.text = title_text

    # generate instructions
    if has_instructions == True:
        instructions_text = test['entered_instructions']

        instructions_para = doc.add_paragraph()
        instructions_para.paragraph_format.space_after = Pt(40)
        instructions_run = instructions_para.add_run()
        instructions_font = instructions_run.font
        instructions_font.name = 'Helvetica'
        instructions_font.size = Pt(12)

        instructions_run.text = instructions_text

    # geneate section loop
    TMP_QUESTION_INDEX = 10
    for i in range(len(section)):
        # generate section title
        has_section_title = section[i]['section_title']
        has_section_instructions = section[i]['section_instructions']
        question_type = section[i]['question_type']
        question_structure = section[i]['question_structure']

        if has_section_title:
            section_title_para = doc.add_paragraph()
            section_title_para.paragraph_format.space_before = Pt(20)
            section_title_para.paragraph_format.space_after = Pt(0)
            section_title_run = section_title_para.add_run()
            section_title_font = section_title_run.font
            section_title_font.name = 'Helvetica'
            section_title_font.size = Pt(12)
            section_title_font.bold = True

            section_title_run.text = "section " + f"{i + 1}: Multiple Choice"

        # generate section instructions
        if has_section_instructions:
            section_instructions_para = doc.add_paragraph()
            section_instructions_para.paragraph_format.space_before = Pt(0)
            section_instructions_para.paragraph_format.space_after = Pt(0)
            section_instructions_run = section_instructions_para.add_run()
            section_instructions_font = section_instructions_run.font
            section_instructions_font.name = 'Helvetica'
            section_instructions_font.size = Pt(12)

            section_instructions_run.text = "Circle the correct answer"

        # generate questions
        if question_type == "MC":
            questions = question_structure['questions']
            for j in range(len(questions)):
                question_text = questions[j]['entered_question']

                question_para = doc.add_paragraph()
                question_para.paragraph_format.space_before = Pt(12)
                question_para.paragraph_format.space_after = Pt(12)
                question_run = question_para.add_run()
                question_font = question_run.font
                question_font.name = 'Helvetica'
                question_font.size = Pt(12)

                question_run.text = f"{j + 1}. {question_text}\n"

                answer_options = questions[j]['answer_options']
                for k in range(len(answer_options)):
                    answer_option_text = answer_options[k]['entered_option']
                    option_letter = chr(97 + k)
                    question_run.text += f"    {option_letter}) {answer_option_text}\n"

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
