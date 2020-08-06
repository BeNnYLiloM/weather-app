const apiUrlSevenDays = 'https://api.openweathermap.org/data/2.5/forecast?exclude=hourly,daily';
const getResponse = '&units=metric';
const apiKey = '&appid=367f31293ad3e851bb9602a1e1ad97b7';

export const urlApiWeather = `${apiUrlSevenDays}${getResponse}${apiKey}&`;
export const centerMap = [47.63465150, 14.64557591];
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
