import * as React from 'react';

type Props = {
  tooltipDescription: string;
  title: string;
};

function TooltipContent({ tooltipDescription, title }: Props) {
  return (
    <React.Fragment>
      <h1 className="TooltipContent__title">{title}</h1>
      <p>{tooltipDescription}</p>
    </React.Fragment>
  );
}

export default TooltipContent;
