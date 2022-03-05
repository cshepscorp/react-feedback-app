import { v4 as uuidv4 } from 'uuid';
import { createContext, useState } from 'react';

const FeedbackContext = createContext();

// need provider so that our components can access state/context
export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: '1',
      text: 'This is feedback item 1',
      rating: 10,
    },
    {
      id: '2',
      text: 'This is feedback item 2',
      rating: 9,
    },
    {
      id: '3',
      text: 'This is feedback item 3',
      rating: 8,
    },
  ]);

  // delete feedback
  const deleteFeedback = (id) => {
    console.log('App', id);
    if (window.confirm('Are you sure?')) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  // add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    console.log(newFeedback);
    setFeedback([newFeedback, ...feedback]);
  };

  const [feedbackToEdit, setFeedbackToEdit] = useState({
    item: {},
    edit: false,
  });

  // set item to be updated
  const editFeedback = (item) => {
    setFeedbackToEdit({
      item,
      edit: true,
    });
  };

  // update feedback item
  const updateFeedback = (id, updatedFeedbackItem) => {
    //console.log(id, updatedFeedbackItem);
    setFeedback(
      feedback.map((item) =>
        item.id === id ? { ...item, ...updatedFeedbackItem } : item
      )
    );
  };

  return (
    <FeedbackContext.Provider
      // pieces of state in white
      value={{
        feedback,
        feedbackToEdit,
        // functions are in purpple
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
