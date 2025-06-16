import { Label, TextInput } from "flowbite-react";

export default function postInput() {
  return (
    <div className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="small">Small input</Label>
        </div>
        <TextInput id="small" type="text" sizing="sm" />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="base">Base input</Label>
        </div>
        <TextInput id="base" type="text" sizing="md" />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="large">Large input</Label>
        </div>
        <TextInput id="large" type="text" sizing="lg" />
      </div>
    </div>
  );
}
