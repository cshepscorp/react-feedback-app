import { useState, useContext, useEffect } from 'react';
import Card from '../shared/Card';
import Button from '../shared/Button';
import RatingSelect from './RatingSelect';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm() {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(6);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');

  // feedbackToEdit is the item and the boolean
  const { addFeedback, feedbackToEdit, updateFeedback } =
    useContext(FeedbackContext);

  // good place for fetches on page load
  useEffect(() => {
    console.log('feedbackToEdit from useEffect in FeedbackForm');
    console.log(feedbackToEdit);
    if (feedbackToEdit.edit === true) {
      setBtnDisabled(false);
      setText(feedbackToEdit.item.text);
      setRating(feedbackToEdit.item.rating);
    }
  }, [feedbackToEdit]); // when feedbackToEdit state changes, run this effect

  const handleTextChange = (e) => {
    if (text === '') {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== '' && text.trim().length <= 10) {
      setBtnDisabled(true);
      setMessage('text must be at least 10 chars');
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }
    //console.log(e.target.value);
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      };
      if (feedbackToEdit.edit === true) {
        updateFeedback(feedbackToEdit.item.id, newFeedback);
      } else {
        addFeedback(newFeedback);
      }

      setText('');
    }
  };
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>how would you rate your service?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            value={text}
            placeholder="write a review"
          />
          <Button type="submit" isDisabled={btnDisabled} className="btn">
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
