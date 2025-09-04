import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const CommonForm = ({ formControl, formData, setFormData, onSubmit, buttonFrom }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {formControl.map((formControlData, index) => (
        <div key={index} className="space-y-2">
          <Label htmlFor={formControlData.name}>{formControlData.label}</Label>
          <Input
            id={formControlData.name}
            type={formControlData.type}
            name={formControlData.name}
            placeholder={formControlData.placeholder}
            value={formData[formControlData.name] || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                [formControlData.name]: e.target.value,
              })
            }
          />
        </div>
      ))}

      <Button type="submit" className="w-full">
        {buttonFrom}
      </Button>
    </form>
  );
};

export default CommonForm;
