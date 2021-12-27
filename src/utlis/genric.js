export const getHrminFormate = ( time ) => {
    let result ;
     var hr = (time/60).toFixed();
     var min = time%60;
     result = `${hr} h : ${min} min`
   return result
};

export const formatDate = (itemDate) => {
  let date = new Date(itemDate);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let dateStr = `${
    monthNames[date.getMonth()]
  } ${date.getDate()} ${date.getFullYear()}`;
  return dateStr;
};
export const dateFormater = (itemDate) => {
  const date = new Date(itemDate);
  const dateStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  console.log("date", typeof dateStr)
  return dateStr;
};

export const upcomingClac = (itemDate) => {
  const date = new Date(itemDate);
  const today = new Date();
  console.log("date", date.getTime(), today.getTime())
  return date.getTime() > today.getTime();
};


export const headerAuth = (token) => {
    const data =  {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token && localStorage.getItem("jwt-token-login")
        }
      }
    return data
}
export const apiEndPoint = 'https://movie-imdb-fynd.herokuapp.com/api/v1'

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;
  return re.test(String(email).toLowerCase());
}

