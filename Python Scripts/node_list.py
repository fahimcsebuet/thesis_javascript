#!/usr/bin/python
__author__ = 'milu'

import xml.etree.ElementTree
e = xml.etree.ElementTree.parse('mapgraph_new.xml').getroot()
node_list = open("node_list.txt", "w")
node_dict = {}
for atype in e.findall('item'):

    prev_id = atype.get('prev_id')
    prev_lon = atype.get('prev_lon')
    prev_lat = atype.get('prev_lat')

    current_id = atype.get('current_id')
    current_lon = atype.get('current_lon')
    current_lat = atype.get('current_lat')

    print prev_id,current_id

    node_dict[prev_id] = str(prev_lon) + "," + str(prev_lat)
    node_dict[current_id] = str(current_lon) + "," + str(current_lat)


for node,value in node_dict.items():
    print node
    node_list.write(node + ":" + value +'\n')

print 'Hello World'