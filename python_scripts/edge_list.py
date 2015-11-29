#!/usr/bin/python
__author__ = 'milu'

import xml.etree.ElementTree
e = xml.etree.ElementTree.parse('mapgraph_new.xml').getroot()
edge_list = open("edge_list.txt", "w")
for atype in e.findall('item'):

    prev_id = atype.get('prev_id')
    prev_lon = atype.get('prev_lon')
    prev_lat = atype.get('prev_lat')

    current_id = atype.get('current_id')
    current_lon = atype.get('current_lon')
    current_lat = atype.get('current_lat')

    distance = atype.get('distance')

    print prev_id,current_id

    edge = str(prev_id)+","+str(current_id)
    edge_list.write(edge +'\n')


print 'Hello World'