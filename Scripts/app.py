#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import urllib.request
try:
	from BeautifulSoup import BeautifulSoup
except ImportError:
	from bs4 import BeautifulSoup

import re
import bs4

reg=None
i=0
fichier = open("data.txt", "a")

while i < 1000:
	url = "https://fr.wikipedia.org/wiki/Sp%C3%A9cial:Page_au_hasard"

	response = urllib.request.urlopen(url)
	print(response.url)
	data = response.read()
	text = data.decode('utf-8')

	parsed_html = BeautifulSoup(text, "lxml")

	


	p = None
	#if parsed_html.find('div', attrs={'class':'infobox_v3'}) != None:
	#	p = parsed_html.find('div', attrs={'class':'infobox_v3'})
	#	p = p.find_next_sibling()
	#elif parsed_html.find('div', attrs={'class':'tright'}) != None:
	#	p = parsed_html.find('div', attrs={'class':'tright'})
	#	p = p.find_next_sibling()
	#elif parsed_html.find('table', attrs={'class':'infobox_v2'}) != None:
	#	p = parsed_html.find('table', attrs={'class':'infobox_v2'})
	#	p = p.find_next_sibling()

	content_text = parsed_html.find('div', attrs={'id': 'mw-content-text'})

	if content_text == None:
		print("None :(")

	c0 = None
	c1 = None
	c2 = None
	c3 = None
	j = 0
	k = 0

	while j <10:
		if not isinstance(content_text.contents[j], type(None)) and not isinstance(content_text.contents[j], bs4.element.NavigableString) :
			if k == 0:
				c0 = content_text.contents[j]
			if k == 1:
				c1 = content_text.contents[j]
			if k == 2:
				c2 = content_text.contents[j]
			if k == 3:
				c3 = content_text.contents[j]
			k+=1
		j+=1


	print(c0.name, c0.get("class", "non"))
	print(c1.name, c1.get("class", "non"))
	print(c2.name, c2.get("class", "non"))
	print(c3.name, c3.get("class", "non"))

	first_paragraph = None
	offset = -1

	i+=1

	if offset == -1 and c1.name == "p" and "infobox" in c0.get("class", "non")[0] :
		first_paragraph = c1.text
		offset = 0
	elif offset == -1 and c2.name == "p" and "infobox" in c1.get("class", "non")[0] :
		first_paragraph = c2.text
		offset = 1
	elif offset == -1 and c2.name == "p" and "infobox" in c0.get("class", "non")[0] :
		first_paragraph = c2.text
		offset = 0
	elif offset == -1 and c3.name == "p" and "infobox" in c2.get("class", "non")[0] :
		first_paragraph = c3.text
		offset = 2
	elif offset == -1 and c3.name == "p" and "infobox" in c1.get("class", "non")[0] : 
		first_paragraph = c3.text
		offset = 1
	elif offset == -1 and c3.name == "p" and "infobox" in c0.get("class", "non")[0] :
		first_paragraph = c3.text
		offset = 0
	else :
		continue

	print(first_paragraph)
	print(offset)


	if offset == 0:
		if c0.find('img') != None :
			fichier.write(response.url+ '\n'+ first_paragraph+ '\n\n')
	if offset == 1:
		if c1.find('img') != None :
			fichier.write(response.url+ '\n'+ first_paragraph+ '\n\n')
	if offset == 2:
		if c2.find('img') != None :
			fichier.write(response.url+ '\n'+ first_paragraph+ '\n\n')

	print("i = ", i)

fichier.close()