import React, { useEffect, useRef, useState } from 'react';
import { renderToString } from 'react-dom/server';
import styled from 'styled-components';
import useFetch from 'utils/useFetch';
import { getCases } from 'services/case';
import ripple from './assets/ripple.svg';
import mapStyles from './mapStyles';
import InfoPopup from './components/InfoPopup';
import Buttons from 'components/Button';
import { ReactComponent as ArenaIcon } from './assets/Arenaicon.svg';
import { Modal } from 'antd';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Map = () => {
  const mapRef = useRef(null);
  const { data: cases, loading } = useFetch(() => getCases(), null, []);
  const [visible, setVisible] = useState(false);

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
          north: 18.835952,
          south: 18.734216,
          west: 98.931837,
          east: 99.077914
        },
        strictBounds: true
      }
    });

    mapRef.current = map;
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    const map = mapRef.current;

    const infowindow = new window.google.maps.InfoWindow();

    cases.forEach(caseItem => {
      const coords = caseItem.location;
      const latLng = new window.google.maps.LatLng(coords.lat, coords.lng);
      const marker = new window.google.maps.Marker({
        map,
        position: latLng,
        optimized: false,
        icon: ripple
      });

      marker.addListener('click', function() {
        infowindow.setContent(renderToString(<InfoPopup data={caseItem} />));
        infowindow.open(map, marker);
      });
    });
  }, [loading, cases]);

  const handleOk = () => {
    setVisible(false);
  };

  return (
    <>
      <MapContainer id="map" />
      <ModalButtonWrapper>
        <ButtonModal icon={<IconArena />} onClick={() => setVisible(true)}>
          พื้นที่เสี่ยง
        </ButtonModal>
      </ModalButtonWrapper>
      <ModalCustom
        title="พื้นที่เสี่ยง"
        visible={visible}
        onOk={handleOk}
        cancelButtonProps={{ style: { display: 'none' } }}
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
  position: absolute;
  top: 445px;
  left: 31px;

  @media screen and (max-width: 768px) {
    top: 480px;
  }
`;

const ButtonModal = styled(Buttons)`
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
  }
`;

const IconArena = styled(ArenaIcon)`
  margin-right: 10px;
`;

const ModalCustom = styled(Modal)`
  p {
    ${({ theme }) => theme.typography.body()};
    color: ${({ theme }) => theme.color.neutralColor.black};
  }
  .ant-modal-content {
    .ant-modal-close {
      display: none;
    }
    .ant-modal-header {
      height: 57px;
      display: flex;
      align-items: center;
      .ant-modal-title {
        ${({ theme }) => theme.typography.body()};
        color: ${({ theme }) => theme.color.neutralColor.black};
      }
    }
  }
`;

const ButtonCloseModal = styled(Buttons)`
  && {
    width: 87px;
    height: 36px;
  }
`;
