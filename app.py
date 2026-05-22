import os
from os import environ
from os import path
from pathlib import Path

from flask import Flask, render_template
from flask_frozen import Freezer

template_folder = path.abspath('./wiki')

main_app = Flask(__name__, template_folder=template_folder)
#main_app.config['FREEZER_BASE_URL'] = environ.get('CI_PAGE_URL')
main_app.config['FREEZER_DESTINATION'] = 'public'
main_app.config['FREEZER_RELATIVE_URLS'] = True
main_app.config['FREEZER_IGNORE_MIMETYPE_WARNINGS'] = True
freezer = Freezer(main_app)

@main_app.cli.command()
def freeze():
    freezer.freeze()

@main_app.cli.command()
def serve():
    freezer.run()

@main_app.route('/')
def home():
    return render_template('pages/index.html')

@main_app.route('/<page>')
def pages(page):
    return render_template(str(Path('pages')) + '/' + page.lower() + '.html')

# Main Function, Runs at http://0.0.0.0:8080
if __name__ == "__main__":
    main_app.run(port=8080)