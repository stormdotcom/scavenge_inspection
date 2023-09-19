import image1 from "../../../assets/images/docs/docs1.png";
import image2 from "../../../assets/images/docs/docs2.png";
import image3 from "../../../assets/images/docs/docs3.png";
import image4 from "../../../assets/images/docs/docs4.png";
import image5 from "../../../assets/images/docs/docs5.png";
import image6 from "../../../assets/images/docs/docs6.png";
const userGuide = {
    sections: [
        {
            title: "New Organization",
            image: "",
            content: [
                {
                    text:
                        "When a fleet manager from a new organization is signing up, they should select 'New Organization' the checkbox at the top of the screen. And in the organization name input box he should type the organization name.",
                    paragraphImage: image1
                }
            ]
        },
        {
            title: "Existing Organization",
            image: "",
            content: [
                {
                    text:
                        "When fleet managers from existing organizations sign up, they need to select 'Existing Organization' from the checkbox. And in the Organization name, a dropdown will appear where they need to select the organization name.",
                    paragraphImage: image2
                }
            ]
        },
        {
            title: "New Vessel",
            image: "",
            content: [
                {
                    text:
                        "When personnel is signing up as a vessel for the first time, they will need to select the organization they are from and the manager under whom the vessel is in.",
                    paragraphImage: image3
                }
            ]
        },
        {
            title: "Functionalities of Vessel Login",
            image: "",
            content: [
                {
                    text:
                        "From a vessel login, you can have a list of features that you can do, from uploading images for inspection to view older reports. A Vessel will be having the options to have all the details about the inspection date and will also be able to edit other things like total running hours, cylinder oil type, cylinder oil consumption, running hours while uploading each inspection report.",
                    paragraphImage: image4
                },
                {
                    text:
                        "And when you click on the 'Upload Cylinder Image' Button, it’ll open a popup where you can specify the cylinder number and upload the cylinder image for prediction.",
                    paragraphImage: image5
                },
                {
                    text:
                        "This is how your predictions will show up on the screen whenever you upload a cylinder image. And for each cylinder, you can type remarks according to the status of the cylinder before saving or downloading the report. Vessels also have the option to view and download older reports from the report screen that are available."
                }
            ]
        },
        {
            title: "Functionalities of a Fleet manager",
            image: "",
            content: [
                {
                    text:
                        "In fleet manager login, the fleet manager will have a dashboard where they will have the option to view all the vessels that come under that fleet manager. They are also responsible for adding new vessels and allowing the new vessels to be under their fleet. These two containers will be in the fleet manager’s dashboard. There will be the option to approve or reject the vessels who selected this fleet manager while creating the account. Also, the fleet managers are allowed to create a new vessel under them. And the fleet managers are the ones who are allowed to manage subscriptions and look at the subscription details from the subscription screen.",
                    paragraphImage: image6
                }
            ]
        }
    ]
};


export { userGuide };
