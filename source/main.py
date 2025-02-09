#################################################### Flask Imports
from flask import Flask, render_template, request, session, redirect, url_for, make_response


#################################################### Draw "The X"
from python.modules.Logger import Log
Log.clear()
Log.brand()


#################################################### Initializing File Structure
from python.modules.FileSystem import FileSystem
FileSystem.init()


#################################################### Globals
from python.modules.Globals import Globals

# Prints latest tracked version
Log.center('', '-')
Log.center(Globals.CONF["version"], '-')
Log.center('', '-')


#################################################### Setting Up MySQL
from python.modules.MySQL import MySQL
######## If Database Is Enabled
if(
    Globals.CONF.get("database", {}).get("enabled") is True and
    Globals.CONF.get("database", {}).get("MySQL", {}).get("enabled") is True
):
    ######## Set Up Connection
    MySQL.init(
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


#################################################### Secret Key
import os

# Disable random secret_key assignment on each server restart when debug is True
if Globals.CONF.get("default", {}).get("debug") is True: app.secret_key = b'12345'

# Generates new "secret_key" every time when server is started
else: app.secret_key = os.urandom(24)


#################################################### routeGuard
from python.modules.routeGuard import routeGuard, routeLogs


#################################################### Decorations
# @app.before_first_request
# def app_init():
#     return None

@app.before_request
def before_request():
    routeLogs()
    # routeGuard()

# @app.after_request
# def after_request(response):
#     return response

# @app.teardown_request
# def teardown_request_func(error=None):
#     return None


#################################################### Dynamically Imprting All Pages
from python.pages import *


#################################################### RUN using Flask (For Development)
### Flask server
# if __name__ == "__main__":
    # No SSL
    # app.run(host=CONF["URL"]["domain_name"], port=CONF["URL"]["port"], debug=True, threaded=True)

    # OpenSSL
    # app.run(host=CONF["URL"]["domain_name"], port=CONF["URL"]["port"], debug=True, threaded=True, ssl_context=('SSL/cert.pem', 'SSL/key.pem'))
