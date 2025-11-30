const ContactCard = ({
  title,
  body,
  btnName,
  btnLink,
}: {
  title: string;
  body: string;
  btnName: string;
  btnLink: string;
}) => {
  return (
    <div class="card card-border bg-base-200 border-base-300 rounded-box grid grow max-w-1/3">
      <div class="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{body}</p>
        <div class="card-actions justify-end">
          <a class="btn btn-primary" href={btnLink}>
            {btnName}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
