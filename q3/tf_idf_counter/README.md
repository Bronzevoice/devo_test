## Project Title
Tf-Idf Ranking

### Prerequisites
It is necessary to have Node.js installed. It can be downloaded at https://nodejs.org.

### Installing
Once in the root of the project, it is necessary to install the node_modules package. This would be done with the following command:
``` 
npm install
```

### Guide
Params: 
   * -t : indicates the terms to analyze. This param is mandatory to run the program. Not case sensitive, will retrieve all matches in lower or in upper case.
   * -p : Indicates how often the program shows the results in seconds. By default is 3 seconds.
   * -d : Indicates the directory where the program will search the files to analyze them. By default it is the 'data' folder in the root of the project.
   * -n : Indicates the number of documents shown in the ranking. By default is 3.

The command to start the program is 'node index.js' plus params. For example:

```
node index.js -t "special" -n 2 -p 3
```
This indicates the terms to analyze would be "special" and the program will show the highest two results every 3 seconds.

If a new file is added in the folder while the program is running, the results will be updated with the dara from that new file.



