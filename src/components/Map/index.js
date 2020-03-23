import React, { useEffect, useRef, useState } from 'react';
import { renderToString } from 'react-dom/server';
import styled from 'styled-components';
import { useNews } from 'contexts/news.context';
import useFirestore from 'utils/useFirestore';
import rippleIcon from './assets/ripple.svg';
import newsIcon from './assets/news.svg';
import mapStyles from './mapStyles';
import { CasePopup, NewsPopup } from './components/InfoPopup';
import Buttons from 'components/Button';
import { ReactComponent as ArenaIcon } from './assets/Arenaicon.svg';
import { Modal, Button } from 'antd';
import eventTracker from 'utils/eventTracker';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Map = () => {
  const mapRef = useRef(null);
  const infoWindowRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const { news, newsLoading } = useNews();

  const { data: cases, loading } = useFirestore(db => db.collection('cases'));

  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 18.7918218, lng: 98.9855059 },
      zoom: 14.24,
      styles: mapStyles,
      zoomControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      gestureHandling: 'greedy',
      restriction: {
        latLngBounds: {
          north: 19.370793,
          south: 18.4548,
          west: 98.521096,
          east: 99.342739
        },
        strictBounds: true
      }
    });

    const infowindow = new window.google.maps.InfoWindow();

    mapRef.current = map;
    infoWindowRef.current = infowindow;
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    const map = mapRef.current;

    const infowindow = infoWindowRef.current;

    const markers = [];

    cases.forEach(caseItem => {
      const coords = caseItem.location;
      const latLng = new window.google.maps.LatLng(coords.lat, coords.lng);
      const marker = new window.google.maps.Marker({
        map,
        position: latLng,
        optimized: false,
        icon: rippleIcon
      });

      markers.push(marker);

      marker.addListener('click', function() {
        infowindow.setContent(renderToString(<CasePopup data={caseItem} />));
        infowindow.open(map, marker);
      });
    });

    return () => {
      markers.forEach(marker => {
        marker.setMap(null);
      });
    };
  }, [loading, cases]);

  useEffect(() => {
    if (newsLoading) {
      return;
    }

    console.log('news', news);

    const map = mapRef.current;

    const infowindow = infoWindowRef.current;

    const markers = [];

    news.forEach(newsItem => {
      const coords = newsItem.location;
      const latLng = new window.google.maps.LatLng(coords.lat, coords.lng);
      const marker = new window.google.maps.Marker({
        map,
        position: latLng,
        icon: newsIcon
      });

      markers.push(marker);

      marker.addListener('click', function() {
        infowindow.setContent(renderToString(<NewsPopup data={newsItem} />));
        infowindow.open(map, marker);
      });
    });

    return () => {
      markers.forEach(marker => {
        marker.setMap(null);
      });
    };
  }, [newsLoading, news]);

  const handleOk = () => {
    setVisible(false);
  };

  const onClickButton = () => {
    setVisible(true);
    eventTracker({ type: 'openDangerAreaModal', id: 'openDangerAreaModal' });
  };

  return (
    <>
      <MapContainer id="map" />
      <ModalButtonWrapper>
        <ButtonModal icon={<IconArena />} onClick={() => onClickButton()}>
          พื้นที่เสี่ยง
        </ButtonModal>
      </ModalButtonWrapper>
      <ModalCustom
        title="พื้นที่เสี่ยง"
        visible={visible}
        onOk={handleOk}
        cancelButtonProps={{ style: { display: 'none' } }}
        centered
        footer={[
          <ButtonCloseModal key="submit" onClick={() => setVisible(false)}>
            ปิด
          </ButtonCloseModal>
        ]}
      >
        <p>
          ข้อมูลพื้นที่เสี่ยงมาจากการยืนยันแหล่งข่าวของคนในพื้นที่จังหวัดเชียงใหม่
          และจังหวัดใกล้เคียง
          โดยจะถูกโหวตจากความน่าเชื่อถือจากคนในพื้นที่ด้วยกันเองเพื่อนำมาแสดงบนแผนที่จังหวัดเชียงใหม่
        </p>
      </ModalCustom>
    </>
  );
};

export default Map;

const ModalButtonWrapper = styled.div`
  bottom: 35px;
  left: 31px;
  position: absolute;
`;

const ButtonModal = styled(Button)`
  && {
    ${({ theme }) => theme.typography.link()};
    color: ${({ theme }) => theme.color.neutralColor.black};
    max-width: 94px;
    width: 100%;
    height: 35px;
    background: #ffffff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    border: none;
    padding: 6px;
    display: flex;
    align-items: center;

    :focus {
      color: ${({ theme }) => theme.color.neutralColor.black};
    }
  }
`;

const IconArena = styled(ArenaIcon)`
  margin-right: 10px;
`;

const ModalCustom = styled(Modal)`
  p {
    ${({ theme }) => theme.typography.body()};
    color: ${({ theme }) => theme.color.neutralColor.black};
    margin: 0;
  }
  .ant-modal-content {
    .ant-modal-close {
      display: none;
    }
    .ant-modal-header {
      height: 57px;
      display: flex;
      align-items: center;
      padding: 21px 30px 15px;
      .ant-modal-title {
        ${({ theme }) => theme.typography.body()};
        color: ${({ theme }) => theme.color.neutralColor.black};
      }
    }
    .ant-modal-body {
      padding: 13px 32px 15px;
    }
  }
`;

const ButtonCloseModal = styled(Buttons)`
  && {
    width: 87px;
    height: 36px;
  }
`;
