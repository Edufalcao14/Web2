const dateTimeNow = new Date();
dformat = [dateTimeNow.getMonth()+1,
    dateTimeNow.getDate(),
    dateTimeNow.getFullYear()].join('/')+' '+
   [dateTimeNow.getHours(),
    dateTimeNow.getMinutes(),
    dateTimeNow.getSeconds()].join(':');

alert(
    dformat + " : This is the best moment to have a look at this website !"
  );