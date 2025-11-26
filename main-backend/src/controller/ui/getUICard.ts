import { Request, Response } from "express";

const getUICard = async (req: Request, res: Response) => {
  try {
    const cardTypes = [
      {
        type: "card",
        parameters: {
          title: { type: "string" },
          value: { type: "string" },
          changePercentage: { type: "number" },
        },
      },
      {
        type: "chip",
        parameters: {
          label: { type: "string" },
        },
      },
    ];

    const actions = {
      redirect: {
        parameters: {
          href: { type: "string" },
        },
      },
      copy: {
        parameters: {
          text: { type: "string" },
        },
      },
    };

    return res.status(200).json({
      status: true,
      cardTypes,
      actions,
    });
  } catch (error: unknown) {
    console.log("Error fetching ui cards:", error);
    return res.status(500).json({ status: false });
  }
};

export default getUICard;
