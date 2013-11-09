from flask import Flask
from flask import render_template

from pyechonest import config
from pyechonest import artist

config.ECHO_NEST_API_KEY = "Z5YYKIYYQG3NZEXWN"

app = Flask(__name__)

@app.route("/")
def hello():
  weezer_results = artist.search(name="weezer")
  weezer = weezer_results[0]
  weezer_blogs = weezer.blogs
  print 'Blogs about weezer:', [blog.get('url') for blog in weezer_blogs]
  return render_template('index.html')



if __name__ == "__main__":
  app.run()
