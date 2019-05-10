#!/bin/sh

arr=();

while read x y; 
do 
    arr=("${arr[@]}" $x $y)
done

vars=(${arr[@]})
len=${#arr[@]}

printf "{"
for (( i=0; i<len; i+=2 ))
do
    printf "\"${vars[i]}\": ${vars[i+1]}"
    if [ $i -lt $((len-2)) ] ; then
        printf ", "
    fi
done
printf "}"
echo