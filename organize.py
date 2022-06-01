# https://forums.redflagdeals.com/multiple-week-14th-april-20th-april-grocery-round-up-quebec-2536255/

import sys

# files: input ouput name
file_in = 'groceries.txt'
file_out = 'groceries(new).txt'

# change print -> write to file
sys.stdout = open(file_out, 'w')

# Bools
Note = False # Flag if writing notes

with open(file_in) as file:
    for line in file:
        # split line into list
        temp = line.rstrip().split()

        # if line not empty
        if temp != []:

            # if first char of the line is NOT a number
            if not temp[0][0].isnumeric() and not temp[0].startswith('FREE') and not temp[0].startswith('BOGO'): 

                # if it ends with : or soon
                if temp[-1] == ":" or temp[-1] == "soon" or temp[-1] == "sson":

                    # skip line
                    print('')
                    # print line
                    print(' '.join(temp),sep="")

                # if not ending with : or soon
                else:

                    # Notes :

                    # if first line of note
                    if not Note:
                        if not temp[0].startswith('save'):
                            print(' ')
                        
                    print(' '.join(temp))
                    Note = True

            # if first char of the line is a number
            else:
                print(temp[0].ljust(9), ' '.join(temp[1:]))
                