import config from '../../config';
import Auth from '../../services/Auth';
import ApiResponse from '../../types/ApiResponse';
import Poll from '../../types/Poll';
import PollOption from '../../types/PollOption';

class PollApi {
  public static Validate(poll: Poll): ApiResponse {
    const result = new ApiResponse();

    if (!poll || !poll.Name || typeof poll.Name !== 'string' || poll.Name.trim().length === 0) {
      result.Messages.push('Please provide a correct name.');
    }

    if (!poll || !poll.Options || !Array.isArray(poll.Options) || poll.Options.length === 0) {
      result.Messages.push('Please provide poll options.');
    } else {
      for (let i = 0; i < poll.Options.length; i += 1) {
        if (!poll.Options[i].Name) {
          result.Messages.push(`Option ${i} may not be empty`);
        } else {
          for (let j = i + 1; j < poll.Options.length; j += 1) {
            if (poll.Options[i].Name === poll.Options[j].Name) {
              result.Messages.push(`Option ${poll.Options[i].Name} defined multiple times`);
              break;
            }
          }
        }
      }
    }

    result.IsSuccess = result.Messages.length === 0;
    return result;
  }

  public static GetPoll(id: string): Promise<Poll> {
    return fetch(`${config.basePath}/api/polls/${id}`, {
      headers: {
        'x-auth-token': Auth.getToken()
      },
      method: 'GET',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json();
      })
      .then(json => json.poll
        // {
        //   return {
        //     CreatedBy: json.poll.createdBy as string,
        //     Name: json.poll.name as string,
        //     Options: [],
        //     Voted: [],
        //   };
        // }
      );
  }

  public static GetPolls(): Promise<Poll[]> {
    return fetch(`${config.basePath}/api/polls`, {
      headers: { 'x-auth-token': Auth.getToken() },
      method: 'GET',
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return { polls: [] };
      })
      .then(json => json.polls);
  }

  public static CreatePoll(poll: Poll) {
    return fetch(`${config.basePath}/api/polls`, {
      body: JSON.stringify(poll),
      headers: { 'x-auth-token': Auth.getToken(), 'Content-Type': 'application/json' },
      method: 'POST',
    })
      .then((response) => {
        if (response.status === 200) {
          return true;
        }
        return false;
      });
  }

  public static Vote(pollId: string, optionName: string) {
    return fetch(`${config.basePath}/api/polls/${pollId}/${optionName}`, {
      headers: { 'x-auth-token': Auth.getToken(), 'Content-Type': 'application/json' },
      method: 'PUT',
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return { success: false, message: 'Sorry, there was a server error' };
      });
  }

  public static AddOption(pollId: number, optionName: string) {
    return fetch(`${config.basePath}/api/polls/${pollId}/${optionName}`, {
      headers: { 'x-auth-token': Auth.getToken(), 'Content-Type': 'application/json' },
      method: 'POST',
    })
      .then((response) => {
        if (response.status === 200) {
          return true;
        }
        return false;
      });
  }

  public static Delete(pollId: string) {
    return fetch(`${config.basePath}/api/polls/${pollId}`, {
      headers: { 'x-auth-token': Auth.getToken(), 'Content-Type': 'application/json' },
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 200) {
          return true;
        }
        return false;
      });
  }
}

export default PollApi;
