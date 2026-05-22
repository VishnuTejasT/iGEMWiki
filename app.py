from functools import partial
from http.server import SimpleHTTPRequestHandler
from pathlib import Path
from socketserver import TCPServer


PORT = 8080
WIKI_DIR = Path(__file__).resolve().parent / "wiki"


def main():
    handler = partial(SimpleHTTPRequestHandler, directory=str(WIKI_DIR))

    with TCPServer(("0.0.0.0", PORT), handler) as httpd:
        print(f"Serving {WIKI_DIR} at http://localhost:{PORT}")
        httpd.serve_forever()


if __name__ == "__main__":
    main()
