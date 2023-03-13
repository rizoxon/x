# Flask
from __main__ import app, request, render_template, make_response

# Utils
from __main__ import json

# Home Made
from __main__ import CONF, session, EXTERNALS

from python.tools.tools import pageGuard


#################################################### Log Out
@app.route("/logOut", methods=["GET", "POST"])
@pageGuard("logOut")
def logOut():
    if request.method == "GET": return render_template("index.html", **globals())


    elif request.method == "POST":
        # unknownError
        if request.form["for"] != "logOut":
            return response(type="warning", message="unknownError")

        # Remove User From Session
        session.pop('user')

        # Reset Site Language To The Default
        global langCode
        langCode = CONF["default"]["language"]

        # Redirect To Home
        return response(
            type="success",
            message="success",
            deleteSessionUser=True,
            redirect="home",
            domChange=["menu"]
        )
