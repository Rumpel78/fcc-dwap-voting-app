import PollOption from "./PollOption";

export default class Poll {
    public Name: string;
    public CreatedBy: string;
    public Options: PollOption[];
    public Voted: string[];
};