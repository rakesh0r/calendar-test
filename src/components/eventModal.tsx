// @ts-nocheck
import React, { useState } from "react";

const EventModal = ({ onClose, eventData = {} }) => {
  const [event, setEventData] = useState(eventData);

  const onChange = (e) => {
    const updatedEvent = event;
    const id = e.target.id;
    if (id != "allDay") {
      updatedEvent[id] = e.target.value;
    } else {
      updatedEvent[id] = e.target.checked;
    }
    setEventData(updatedEvent);
  };

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Event Details</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onClose}
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                id="title"
                type="text"
                placeholder="Event Title"
                value={event.title}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label">From</label>
                <div className="control">
                  <input
                    id="from"
                    className="input"
                    type="date"
                    placeholder="From"
                    value={event.from}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label">To</label>
                <div className="control">
                  <input
                    id="to"
                    className="input"
                    type="date"
                    placeholder="To"
                    value={event.to}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label">Start time</label>
                <div className="control">
                  <input
                    id="startTime"
                    className="input"
                    type="time"
                    placeholder="Start time"
                    value={event.startTime}
                    onChange={onChange}
                    disabled={event.allDay}
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label">End time</label>
                <div className="control">
                  <input
                    id="endTime"
                    className="input"
                    type="time"
                    placeholder="End time"
                    value={event.endTime}
                    onChange={onChange}
                    disabled={event.allDay}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="checkbox">
              <input
                type="checkbox"
                id="allDay"
                value={event.allDay}
                onChange={onChange}
              />
              All day
            </label>
          </div>
          <div className="field">
            <label className="label">Color</label>
            <div className="select is-primary">
              <select id="color" onChange={onChange} value={event.color}>
                <option value="">Select</option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="grey">Grey</option>
                <option value="voilet">Voilet</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                id="description"
                className="textarea"
                placeholder="Description"
                value={event.description}
                onChange={onChange}
              ></textarea>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={() => onClose(event)}>
            Save
          </button>
          <button className="button" onClick={onClose}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default EventModal;
