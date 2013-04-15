'''
from HTMLParser import HTMLParser

# create a subclass and override the handler methods
class MyHTMLParser(HTMLParser):
    def handle_starttag(self, tag, attrs):
        
        print "Encountered a start tag:", tag
        print attrs
        if attrs
    def handle_endtag(self, tag):
        print "Encountered an end tag :", tag
    def handle_data(self, data):
        print "Encountered some data  :", data

# instantiate the parser and fed it some HTML
parser = MyHTMLParser()

parser.feed(open('some.html', 'r+').read())

parser.handle_starttag('div', 'id')

parser.handle_data(open('some.html', 'r+').read())

'''
#!/usr/bin/env python

from HTMLParser import HTMLParser

class URLParser(HTMLParser):
    def __init__(self):
        self.in_div = False
        self.divs = []
        self.div = ''
        HTMLParser.__init__(self)

    def handle_starttag(self, tag, attrs):
        if tag == 'div':
            self.div = self.get_div_from_attrs(attrs)
            self.in_div = True

    def handle_endtag(self, tag):
        if tag == 'div':
            self.divs.append(self.div)
            self.in_div = False

    def handle_data(self, data):
        if self.in_div:
            self.div = '%s - %s' % (self.div, data)

    def get_div_from_attrs(self, attrs):
        # The attrs dict is a list of tuples like:
        #  [('href', 'www.google.com'), ('class', 'some-class')]
        for prop, val in attrs:
            print prop, val
            if prop == 'id':
                return val
        return ''
    
url_parser = URLParser()
url_parser.feed(open('some.html', 'r+').read())
print '\n'.join(url_parser.divs)