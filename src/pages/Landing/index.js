import React from 'react';
import Countdown from './CounterTimer';
import CardCustom from 'components/Card';
import moment from 'moment';

const Landing = () => {
  const text = `สถานที่เสี่ยเบสเชียงใหม่ (เซียนมวยที่ติดเชื้อโควิด)ไปใช้บริการ
1.กาแฟอเมซอน (ถ.มหิดล) 
2.Fuel coffe
3. The Xym
4. กูโรตี (ถ.ช่างหล่อ)
5. กาแฟปางขอน (ถ.ช่างหล่อ)
6.กาแฟอเมซอน (ถ.ท่าแพ)
7.สตาร์บัค (ท่าแพ)
8.แบล็กแคนยอน (ท่าแพ)
9.เดอะคอฟฟี่
10.อาข่า อาม่า
11.กาดสวนแก้ว
12.มูนพาย
13.Pacamara coffee
14.Light up cafe'
15.กาแฟไปปยาลใหญ่
16.ร้าน TEA
17.Brown cafe'
18.กาแฟอเมซอน (ปตท.ช้างเผือก)
19.Ice Hub
20. รสนิยม (เจเจมาร์เก็ต)
21.กูโรตี
22. Beyond cafe'
23. กาแฟโอชา
24.กาแฟพันธ์ไทย
25.รสนิยม
26.The Artel Nimman
27. รสนิยม (ถ.โชตนา)
28.มิ่งมิตร (ถ.โชคนา)
29.กอดเชียงใหม่
30.ห้องสมุดพื้นบ้านย่านเวียง
31.ร้านกาแฟบุญรักษา
32.ร้าน Bear Hug Cafe'
33.ร้านNourrish Vegan Bar
34.ร้าน Dark Roast cafe'
35. ร้ารแอทขัวเหล็ก
36.ร้าร Bubble jam
36. ร้าน Memorize Brownie`;

  return (
    <>
      {/* <Countdown
      timeTillDate="3 23 2020, 9:00 am"        
      timeFormat="MM DD YYYY, h:mm a"
    /> */}
      <CardCustom
        img="http://accesstrade.in.th/wp-content/uploads/2020/02/%E0%B8%AD%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%82%E0%B8%AD%E0%B8%87-COVID-19.jpg"
        header={{
          title: 'Eduardo Flores',
          date: moment().format('LT DD/MM/YYYY')
        }}
        content={text}
        link={
          'https://ant.design/components/card/#headerasdfasdfasdfasdfasdfasdfasdf'
        }
      />
    </>
  );
};

export default Landing;
