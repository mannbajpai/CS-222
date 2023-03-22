import os

headers=["Content-Type : text/html"]
qs= os.environ['QUERY_STRING']

def sendHeader():
    for h in headers:
        print(h)
    print("\n")

def sendForm():
    print('''
    <html>
        <body>
            <form action="ssp2.py" method="get">
                <label for="myname">Enter Your Name</label>
                <input id="myname" type="text" name="firstname" value="Mann"/>
                <input type="submit"/>
            </form>
        </body>
    </html>
    ''')

def sendPage(name):
    print('''
          <html>
            <body>
                <h1>Hello {0}</h1>
            </body>
          </html>'''.format(name))

if not qs:
    sendHeader()
    sendForm()
else:
    if 'firstname' in qs:
        name = qs.split('=')[1]
    else:
        name = "No Name Provided"
    sendHeader()
    sendPage(name)