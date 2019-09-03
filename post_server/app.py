from flask import Flask, request
app = Flask(__name__)

@app.route('/form', methods=['POST'])
def handle_data():
    projectpath = request.form
    print(projectpath)
    return str(projectpath)

if __name__ == "__main__":
    app.run()
