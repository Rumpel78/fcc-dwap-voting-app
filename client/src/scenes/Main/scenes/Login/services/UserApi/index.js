class UserApi {
  static Login(username, password) {
    const formData = `username=${username}&password=${password}`;

    fetch('/auth/login', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json, application/xml, text/play, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
    })

      .then((response) => {
        if (response.status === 200) {
          this.setState({ errors: {} });
        }
        return response.json();
      })

      .then((json) => {
        if (json.success) {
          this.setState({
            success: true,
            username: json.user.name,
          });
          this.props.onSuccess(json.user);
          if (this.props.onSignedIn) this.props.onSignedIn(json.user);
        } else {
          const errors = json.errors ? json.errors : {};
          errors.summary = json.message;
          this.setState({
            errors,
          });
        }
      })
      .catch(err => console.Error(err));
  }
}

export default UserApi;
