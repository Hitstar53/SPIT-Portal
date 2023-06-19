import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

function StepThree() {
  const { register, control, handleSubmit } = useForm();
  const { fields: organizedFields, append: appendOrganized, remove: removeOrganized } = useFieldArray({
    control,
    name: 'organized',
  });
  const { fields: invitedFields, append: appendInvited, remove: removeInvited } = useFieldArray({
    control,
    name: 'invited',
  });
  const { fields: committeeFields, append: appendCommittee, remove: removeCommittee } = useFieldArray({
    control,
    name: 'selectionCommittee',
  });
  const { fields: articleFields, append: appendArticle, remove: removeArticle } = useFieldArray({
    control,
    name: 'Article',
  });
  const { fields: coGuideFields, append: appendCoGuide, remove: removeCoGuide } = useFieldArray({
    control,
    name: 'CoGuide',
  });
  const { fields: collaborationFields, append: appendCollaboration, remove: removeCollaboration } = useFieldArray({
    control,
    name: 'collaboration',
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Organized */}
      <h3>Organized</h3>
      {organizedFields.map((item, index) => (
        <div key={item.id}>
          <label className="form-label">Organised</label>
          <input
            type="text"
            name={`organized[${index}].organised`}
            placeholder="Organised"
            className="form-input"
            ref={register()}
          />
          <label className="form-label">Agency</label>
          <input
            type="text"
            name={`organized[${index}].agency`}
            placeholder="Agency"
            className="form-input"
            ref={register()}
          />
          <label className="form-label">Funds</label>
          <input
            type="text"
            name={`organized[${index}].funds`}
            placeholder="Funds"
            className="form-input"
            ref={register()}
          />
          <label className="form-label">Days</label>
          <input
            type="text"
            name={`organized[${index}].days`}
            placeholder="Days"
            className="form-input"
            ref={register()}
          />
          <button type="button" onClick={() => removeOrganized(index)}>
            Delete
          </button>
        </div>
      ))}
      <button type="button" onClick={() => appendOrganized({})}>
        Add Organized
      </button>

      {/* Invited */}
      <h3>Invited</h3>
      {invitedFields.map((item, index) => (
        <div key={item.id}>
          <label className="form-label">Name</label>
          <input
            type="text"
            name={`invited[${index}].name`}
            placeholder="Name"
            className="form-input"
            ref={register()}
          />
          <label className="form-label">Dates</label>
          <input
            type="text"
            name={`invited[${index}].dates`}
            placeholder="Dates"
            className="form-input"
            ref={register()}
          />
          <label className="form-label">Details</label>
          <input
            type="text"
            name={`invited[${index}].details`}
            placeholder="Details"
            className="form-input"
            ref={register()}
          />
          <button type="button" onClick={() => removeInvited(index)}>
            Delete
          </button>
        </div>
      ))}
      <button type="button" onClick={() => appendInvited({})}>
        Add Invited
      </button>

      {/* Selection Committee */}
      <h3>Selection Committee</h3>
      {committeeFields.map((item, index) => (
        <div key={item.id}>
          <label className="form-label">Committee</label>
          <input
            type="text"
            name={`selectionCommittee[${index}].committee`}
            placeholder="Committee"
            className="form-input"
            ref={register()}
          />
          <label className="form-label">Details</label>
          <input
            type="text"
            name={`selectionCommittee[${index}].details`}
            placeholder="Details"
            className="form-input"
            ref={register()}
          />
          <label className="form-label">Organization</label>
          <input
            type="text"
            name={`selectionCommittee[${index}].organization`}
            placeholder="Organization"
            className="form-input"
            ref={register()}
          />
          <label className="form-label">Date</label>
          <input
            type="text"
            name={`selectionCommittee[${index}].date`}
            placeholder="Date"
            className="form-input"
            ref={register()}
          />
          <button type="button" onClick={() => removeCommittee(index)}>
            Delete
          </button>
        </div>
      ))}
      <button type="button" onClick={() => appendCommittee({})}>
        Add Selection Committee
      </button>

      {/* Article */}
      <h3>Article</h3>
      {articleFields.map((item, index) => (
        <div key={item.id}>
          <label className="form-label">Details</label>
          <input
            type="text"
            name={`Article[${index}].details`}
            placeholder="Details"
            className="form-input"
            ref={register()}
          />
          <button type="button" onClick={() => removeArticle(index)}>
            Delete
          </button>
        </div>
      ))}
      <button type="button" onClick={() => appendArticle({})}>
        Add Article
      </button>

      {/* CoGuide */}
      <h3>CoGuide</h3>
      {coGuideFields.map((item, index) => (
        <div key={item.id}>
          <label className="form-label">Institute</label>
          <input
            type="text"
            name={`CoGuide[${index}].institute`}
            placeholder="Institute"
            className="form-input"
            ref={register()}
          />
          <label className="form-label">Details</label>
          <input
            type="text"
            name={`CoGuide[${index}].details`}
            placeholder="Details"
            className="form-input"
            ref={register()}
          />
          <button type="button" onClick={() => removeCoGuide(index)}>
            Delete
          </button>
        </div>
      ))}
      <button type="button" onClick={() => appendCoGuide({})}>
        Add CoGuide
      </button>

      {/* Collaboration */}
      <h3>Collaboration</h3>
      {collaborationFields.map((item, index) => (
        <div key={item.id}>
          <label className="form-label">Name</label>
          <input
            type="text"
            name={`collaboration[${index}].name`}
            placeholder="Name"
            className="form-input"
            ref={register()}
          />
          <label className="form-label">Details</label>
          <input
            type="text"
            name={`collaboration[${index}].details`}
            placeholder="Details"
            className="form-input"
            ref={register()}
          />
          <button type="button" onClick={() => removeCollaboration(index)}>
            Delete
          </button>
        </div>
      ))}
      <button type="button" onClick={() => appendCollaboration({})}>
        Add Collaboration
      </button>

      <button type="submit">Submit</button>
    </form>
  );
}

export default StepThree;
