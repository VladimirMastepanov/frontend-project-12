import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import {
  visibilityModalWindowSelector, typeModalWindowSelector, hideModalWindow,
} from '../../slices/modal/modalSlice';
import { useAddChannelMutation, useGetChannelsQuery } from '../../slices/channels/channelsApi';
import { setActiveChannelId } from '../../slices/channels/channelsSlice';

const ModalAddChannel = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { data: channels, isSuccess } = useGetChannelsQuery();
  const modalVisibility = useSelector(visibilityModalWindowSelector);
  const modalType = useSelector(typeModalWindowSelector);
  const inputRef = useRef();
  const [addChannel] = useAddChannelMutation();
  const [channelNames, setChannelNames] = useState(null);

  const validationSchema = yup.object().shape({
    name: yup.string().min(3, t('lengthLimits')).max(20, t('lengthLimits')).required(t('requiredField')),
  });

  const handleHide = () => {
    dispatch(hideModalWindow());
  };

  useEffect(() => {
    if (isSuccess) {
      setChannelNames(channels.map((el) => el.name));
    }
  }, [isSuccess, channels]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <Modal show={modalVisibility && modalType === 'add'} onHide={handleHide} className="modal-dialog-centered" centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('addChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <Formik
          initialValues={{ name: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            const validName = leoProfanity.clean(values.name);
            if (!channelNames.includes(validName)) {
              const newChannel = { name: validName };
              try {
                const response = await addChannel(newChannel).unwrap();
                dispatch(setActiveChannelId(response.id));
                toast.success(t('channelCreated'));
                actions.resetForm();
                handleHide();
              } catch (e) {
                toast.error(t('connectionError'));
              }
            } else {
              actions.setFieldError('name', t('mustBeUnique'));
            }
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit} disabled={props.isSubmitting}>
              <Field
                innerRef={inputRef}
                required
                name="name"
                id="name"
                value={props.values.name}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className={`mb-2 form-control ${props.errors.name ? 'is-invalid' : ''}`}
              />
              <label className="visually-hidden" htmlFor="name">{t('channelName')}</label>
              <ErrorMessage name="name" component="div" className="invalid-feedback" />
              <div className="d-flex justify-content-end">
                <Button type="button" className="me-2 btn btn-secondary" onClick={handleHide}>{t('cancel')}</Button>
                <Button type="submit" className="btn btn-primary">{t('send')}</Button>
              </div>
            </Form>
          )}

        </Formik>

      </Modal.Body>
    </Modal>
  );
};

export default ModalAddChannel;
