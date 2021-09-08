export const Modal = ({ modalContent }) => {
  return (
    <div className="snackbar">
      <p className="snackbar--message">{modalContent}</p>
    </div>
  );
};

export const CartModal = ({ cartModalContent }) => {
  return (
    <div className="snackbar">
      <p className="snackbar--message">{cartModalContent}</p>
    </div>
  );
};

export const WishListModal = ({ wishlistModalContent }) => {
  return (
    <div className="snackbar">
      <p className="snackbar--message">{wishlistModalContent}</p>
    </div>
  );
};