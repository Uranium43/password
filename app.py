from flask import Flask, render_template, request, jsonify
import re

app = Flask(__name__)

def is_strong_password(password):
    conditions = []

    if len(password) < 8:
        conditions.append("Password should be at least 8 characters long.")

    if not any(char.isupper() for char in password):
        conditions.append("Password should contain at least one uppercase letter.")

    if not any(char.islower() for char in password):
        conditions.append("Password should contain at least one lowercase letter.")

    if not any(char.isdigit() for char in password):
        conditions.append("Password should contain at least one digit.")

    special_characters = "!@#$%^&*()-=_+[]{}|;:'\",.<>/?"
    if not any(char in special_characters for char in password):
        conditions.append("Password should contain at least one special character.")

    if len(set(password)) < len(password):
        conditions.append("Password should not contain repeated characters.")

    return conditions

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/check_password', methods=['POST'])
def check_password():
    password = request.form['password']
    conditions = is_strong_password(password)

    if not conditions:
        result = {'is_strong': True, 'message': 'Password is strong. You can use it!'}
    else:
        result = {'is_strong': False, 'message': 'Password is not strong enough.', 'conditions': conditions}

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
