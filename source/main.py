#################################################### Flask Imports
from flask import Flask, render_template, request, session, redirect, url_for, make_response


#################################################### Draw "The X"
from python.modules.Logger import Log
Log.clear()
Log.brand()


#################################################### Globals
from python.modules.Globals import Globals


#################################################### Initializing File Structure
from python.modules.FileSystem import FileSystem
FileSystem.init()


#################################################### Setting Up MySQL
from python.modules.MySQL import MySQL
######## If Database Enabled
if "database" in Globals.CONF and Globals.CONF["database"]["enabled"] == True:

    ######## Set Up Connection
    MySQL.setUp(
        Globals.CONF["database"]["MySQL"]["user"],
        Globals.CONF["database"]["MySQL"]["password"],
        Globals.CONF["database"]["MySQL"]["host"],
        Globals.CONF["database"]["MySQL"]["name"],
        Globals.CONF["database"]["MySQL"]["charset"],
        Globals.CONF["database"]["MySQL"]["collate"]
    )

    ######## GLOBAL USER_AUTHENTICITY_STATUSES
    Globals.getUserAuthenticityStatuses()

    ######## GLOBAL USER_ROLES
    Globals.getUserRoles()



#################################################### Flask APP
app = Flask(
    __name__,
    root_path = Globals.CONF["flask"]["root_path"],
    template_folder = Globals.CONF["flask"]["template_folder"],
    static_folder = Globals.CONF["flask"]["static_folder"]
)

app.secret_key = Globals.CONF["flask"]["secret_key"]


#################################################### Decorations
# @app.before_first_request
# def app_init():
#     return None

# @app.before_request
# def before_request():
#     pass

# @app.after_request
# def after_request(response):
#     return response

# @app.teardown_request
# def teardown_request_func(error=None):
#     return None


#################################################### Dynamically Imprting All Pages
from python.pages import *


#################################################### RUN (For Development)
### Flask server
# if __name__ == "__main__":
    # No SSL
    # app.run(host=CONF["URL"]["domain_name"], port=CONF["URL"]["port"], debug=True, threaded=True)

    # OpenSSL
    # app.run(host=CONF["URL"]["domain_name"], port=CONF["URL"]["port"], debug=True, threaded=True, ssl_context=('SSL/cert.pem', 'SSL/key.pem'))
