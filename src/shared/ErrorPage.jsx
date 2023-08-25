import { error } from "../utilities/image";

const ErrorPage = () => {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="text-center">
        <img src={error} alt="error" className="w-3/6 lg:w-3/12 mx-auto" />
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
    </div>
  );
};

export default ErrorPage;
