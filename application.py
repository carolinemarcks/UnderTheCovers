from flask import Flask
from flask import render_template
from flask import url_for

from pyechonest import config
from pyechonest import artist
from pyechonest import song


config.ECHO_NEST_API_KEY = "Z5YYKIYYQG3NZEXWN"

app = Flask(__name__)

@app.route("/")
def hello():
  return render_template('index.html')


@app.route("/iwub")
def iwub(title=None):
  url_for('static',filename="*")
  '''
  lsd = song.search(title="I want you back",artist="Lake Street Dive", buckets=["id:rdio-US"])
  print lsd
  for entry in lsd:
   print entry.artist_name

  jsf = song.search(title="I want you back",artist="The Jackson 5", buckets=["id:rdio-US"])
  print jsf
  for entry in jsf:
   print entry.artist_name

  jm = song.search(title="I want you back",artist="David Ruffin", buckets=["id:rdio-US"])
  print jm
  for entry in jm:
   print entry.artist_name
  '''

  return render_template('index.html')

if __name__ == "__main__":
  app.debug = True
  app.run()
  
