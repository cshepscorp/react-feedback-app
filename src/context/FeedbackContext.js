//import { v4 as uuidv4 } from 'uuid';
import { createContext, useState, useEffect } from 'react';

const FeedbackContext = createContext();

// need provider so that our components can access state/context
export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackToEdit, setFeedbackToEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    //console.log(123);
    fetchFeedback();
  }, []);

  // fetch feedback data
  const fetchFeedback = async () => {
    const response = await fetch(`feedback?_sort=id&_order=desc`);
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  };
  // add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch('feedback', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    });
    //newFeedback.id = uuidv4();
    //console.log(newFeedback);
    const data = await response.json();

    setFeedback([data, ...feedback]);
  };

  // delete feedback
  const deleteFeedback = async (id) => {
    //console.log('App', id);
    if (window.confirm('Are you sure?')) {
      await fetch(`/feedback/${id}`, { method: 'DELETE' });

      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  // set item to be updated
  const editFeedback = (item) => {
    setFeedbackToEdit({
      item,
      edit: true,
    });
  };

  // update feedback item
  const updateFeedback = async (id, updatedFeedbackItem) => {
    //console.log(id, updatedFeedbackItem);
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedFeedbackItem),
    });
    const data = await response.json();

    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  };

  return (
    <FeedbackContext.Provider
      // pieces of state in white
      value={{
        isLoading,
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
