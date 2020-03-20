import React from 'react';
import Countdown from './CounterTimer';
import CardCustom from 'components/Card';

const Landing = () => {
  return (
    // <Countdown
    //   timeTillDate="3 23 2020, 9:00 am"
    //   timeFormat="MM DD YYYY, h:mm a"
    // />
    <CardCustom
      header={{
        another: 'Eduardo Flores',
        date: new Date()
      }}
      content={`USA.เริ่มทดสอบวัคซีน #โควิท19 ในมนุษย์แล้ว
โดยการฉีดวัคซีนชุดแรกจะมีขึ้นในอาสาสมัครรายแรกที่เข้า
ร่วมโครงการจากทั้งหมด 45 คน ซึ่งเป็นคนที่มีสุขภาพดี อายุระหว่าง 18-55ปี
วัคซีนดังกล่าวได้รับการพัฒนาโดยบ. Moderna ร่วมกับสถาบันสุขภาพแห่งชาติสหรัฐ`}
      avatar={
        'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
      }
      link={
        'https://www.google.com/search?q=covid-+19&rlz=1C5CHFA_enTH873TH874&sxsrf=ALeKk00M8jzgEcBUhxvarxhgbxZxorICCw:1584680609047&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiy-6Kmo6joAhWw73MBHVn-Ay0Q_AUoAXoECBoQAw&biw=2048&bih=967#imgrc=rsPP-hNMl8vkvM'
      }
      image={
        'https://www.krungsri.com/bank/getmedia/7c972fe6-a3b0-43c9-8434-08daf5ebff33/corona-virus-survival-og.jpg.aspx'
      }
    />
  );
};

export default Landing;
