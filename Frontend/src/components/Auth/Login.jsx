import React, { useState } from "react";
import { Eye, EyeOff, Phone, Lock, ArrowRight, Smartphone } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Login successful! Redirecting to dashboard...");
      
      // Reset form
      setPhone("");
      setPassword("");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpLogin = () => {
    if (!phone.trim()) {
      alert("Please enter your phone number first");
      return;
    }
    
    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }
    
    alert(`OTP sent to ${phone}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>MMP Hybrid System</h1>
          <p style={styles.subtitle}>Broker Login Portal</p>
        </div>
        
        <form onSubmit={submit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone Number *</label>
            <div style={styles.inputContainer}>
              <Smartphone size={20} style={styles.inputIcon} />
              <input
                type="tel"
                required
                placeholder="10-digit phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  ...styles.input,
                  ...(errors.phone && styles.inputError)
                }}
              />
            </div>
            {errors.phone && <p style={styles.errorText}>{errors.phone}</p>}
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password *</label>
            <div style={styles.inputContainer}>
              <Lock size={20} style={styles.inputIcon} />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  ...styles.input,
                  ...(errors.password && styles.inputError)
                }}
              />
              <button
                type="button"
                style={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p style={styles.errorText}>{errors.password}</p>}
          </div>
          
          <div style={styles.rememberForgot}>
            <label style={styles.remember}>
              <input type="checkbox" style={styles.checkbox} />
              Remember me
            </label>
            <a href="#" style={styles.forgotLink}>Forgot password?</a>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            style={{
              ...styles.loginButton,
              ...(isLoading && styles.loginButtonLoading)
            }}
          >
            {isLoading ? (
              <>
                <div style={styles.spinner}></div>
                Logging in...
              </>
            ) : (
              <>
                Login <ArrowRight size={18} style={styles.buttonIcon} />
              </>
            )}
          </button>
        </form>
        
        <div style={styles.divider}>
          <span style={styles.dividerText}>or</span>
        </div>
        
        <button
          onClick={handleOtpLogin}
          style={styles.otpButton}
        >
          <Phone size={18} style={styles.buttonIcon} />
          Login with OTP
        </button>
        
        <div style={styles.signupLink}>
          Don't have an account? <a href="#" style={styles.signupText}>
            <Link to="/signup">
              Sign up here
            </Link>
          </a>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #e0f2ff 0%, #c8e6ff 100%)',
    padding: '20px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '420px',
    overflow: 'hidden'
  },
  header: {
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    color: 'white',
    padding: '25px',
    textAlign: 'center'
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '5px'
  },
  subtitle: {
    opacity: '0.9',
    fontSize: '14px'
  },
  form: {
    padding: '25px'
  },
  inputGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    color: '#374151',
    fontSize: '14px'
  },
  inputContainer: {
    position: 'relative'
  },
  inputIcon: {
    position: 'absolute',
    left: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af'
  },
  input: {
    width: '100%',
    padding: '12px 15px 12px 45px',
    border: '1px solid #d1d5db',
    borderRadius: '10px',
    fontSize: '16px',
    transition: 'all 0.3s'
  },
  inputError: {
    borderColor: '#ef4444',
    boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.2)'
  },
  passwordToggle: {
    position: 'absolute',
    right: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#9ca3af',
    cursor: 'pointer'
  },
  errorText: {
    color: '#ef4444',
    fontSize: '12px',
    marginTop: '5px'
  },
  rememberForgot: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    fontSize: '14px'
  },
  remember: {
    display: 'flex',
    alignItems: 'center'
  },
  checkbox: {
    marginRight: '8px'
  },
  forgotLink: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '500'
  },
  loginButton: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginButtonLoading: {
    opacity: '0.8',
    cursor: 'not-allowed'
  },
  spinner: {
    width: '18px',
    height: '18px',
    border: '2px solid transparent',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginRight: '8px'
  },
  buttonIcon: {
    marginLeft: '8px'
  },
  divider: {
    textAlign: 'center',
    margin: '25px',
    position: 'relative',
    color: '#6b7280',
    fontSize: '14px'
  },
  dividerText: {
    display: 'inline-block',
    padding: '0 10px',
    background: 'white',
    position: 'relative',
    zIndex: '1'
  },
  otpButton: {
    width: 'calc(100% - 50px)',
    margin: '0 25px',
    padding: '12px',
    background: 'white',
    color: '#2563eb',
    border: '1px solid #d1d5db',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signupLink: {
    textAlign: 'center',
    margin: '25px',
    fontSize: '14px',
    color: '#6b7280'
  },
  signupText: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: '500'
  }
};

// Add keyframes for the spinner animation
const styleSheet = document.styleSheet;
const css = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.rememberForgot a:hover {
  text-decoration: underline;
}

.loginButton:hover {
  background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.otpButton:hover {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.signupLink a:hover {
  text-decoration: underline;
}
`;

const style = document.createElement('style');
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);

export default Login;