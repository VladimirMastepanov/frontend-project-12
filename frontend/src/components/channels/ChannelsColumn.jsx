import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ModalAddChannel from './ModalAddChannel';
import ChannelsList from './ChannelsList';

const ChannelsColumn = ({ activeChannelName, setActiveChannelName, setActiveChannelId }) => {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  const onHide = () => setShowModal(false);

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">

      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels')}</b>
        <button onClick={() => setShowModal(true)} type="button" className="p-0 text-primary btn btn-group-vertical">
          <svg xmlns="https:/www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          <span className="visually-hidden">{t('plus')}</span>
        </button>
      </div>

      <ChannelsList
        activeChannelName={activeChannelName}
        setActiveChannelName={setActiveChannelName}
        setActiveChannelId={setActiveChannelId}
      />
      <ModalAddChannel
        show={showModal}
        onHide={onHide}
        setActiveChannelName={setActiveChannelName}
      />

    </div>
  );
};

export default ChannelsColumn;
