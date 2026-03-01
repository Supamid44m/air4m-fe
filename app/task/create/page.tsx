"use client";
import * as React from "react";
import { Fragment } from "react/jsx-runtime";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FormControl from "@mui/material/FormControl";
import dayjs, { Dayjs } from "dayjs";
import { ITaskRequestDto } from "@/app/model/inteface/task/ITaskRequestDto";
import { Button, TextField } from "@mui/material";
import axiosInstance from "@/app/api/axios";
import TaskApi from "@/app/api/task/TaskApi";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import { ITaskMasterDataDto } from "@/app/model/inteface/task/ITaskMasterDataDto";
import {
  AutocompleteOption,
  IMasterData,
} from "@/app/model/inteface/task/IMasterData";
import { PaginateResponse } from "@/app/model/entity/PaginateResponse";
import { ITaskDto } from "@/app/model/inteface/task/ITaskDto";
import { useParams } from "next/navigation";

import { useSearchParams } from "next/navigation";
import { isNullOrUndefined } from "@/app/utils/objectUtil";
import ErrorModal from "@/app/component/ErrorModal";
export default function CreateTask() {
  const params = useSearchParams();
  const currentime = dayjs().format("DD/MM/YYYY HH:mm:ss");
  const [selectedOption, setSelectedOption] =
    React.useState<AutocompleteOption | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [dateValue, setDateValue] = React.useState<Dayjs | null>(null);
  const [optionLists, setOptionList] = React.useState<AutocompleteOption[]>([]);
  const [keyword, setKeyword] = React.useState("");
  const [formValue, setFormValue] = React.useState<ITaskRequestDto>({
    activity: "",
    dateTimeSelected: "",
    createdDate: currentime,
  });
  const [cloneformValue, setCloneFormValue] = React.useState<ITaskRequestDto>({
    activity: "",
    dateTimeSelected: "",
    createdDate: currentime,
  });

  const [isDisableForm, setIsDisableForm] = React.useState(false);
  React.useState<Record<string, string>>();

  const [formError, setFormError] = React.useState<ErrorResponse>({
    errors: [],
  });
  const [pageError, setPageError] = React.useState<Error | null>(null);
  const [isSubmitSuccess, setIsSubmitSucces] = React.useState(false);

  const defaultOptions: AutocompleteOption[] = [
    {
      label: "shopping",
    },
    {
      label: "go to work",
    },
    {
      label: "go date",
    },
  ];

  React.useEffect(() => {
    setCloneFormValue(formValue);
    setOptionList(defaultOptions);
  }, []);

  React.useEffect(() => {
    if (keyword.trim().length < 3) {
      setOptionList(defaultOptions);
      return;
    }

    const fetchOptions = async () => {
      try {
        const res = await axiosInstance.get(`task/options`, {
          params: { keyword },
        });

        setOptionList((prev) => {
          const next = res.data.map((item: ITaskMasterDataDto) => ({
            label: item.title,
          }));

          const merged = [...prev, ...next];

          return Array.from(new Map(merged.map((x) => [x.label, x])).values());
        });
      } catch (err) {
        throw err;
      }
    };

    fetchOptions();
  }, [keyword]);

  const taskApi = new TaskApi(axiosInstance);

  function setDateTime(newValue: Dayjs | null) {
    if (!newValue) return;
    {
      setDateValue(newValue);
      const dt = newValue?.format("DD/MM/YYYY HH:mm:ss");
      updateForm("dateTimeSelected", dt);
      setFormError((prev) => ({
        errors: prev.errors.filter((e) => e.key !== "dateTimeSelected"),
      }));
    }
  }

  function updateForm<K extends keyof ITaskRequestDto>(
    key: K,
    value: ITaskRequestDto[K],
  ) {
    setFormError((prev) => ({
      errors: prev.errors.filter((e) => e.key !== key),
    }));
    setFormValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function submitForm(body: ITaskRequestDto) {
    const validationResult = validateForm(body);

    if (validationResult.errors.length > 0) {
      setFormError(validationResult);
      return;
    }
    try {
      await taskApi.createTask(body);
      setIsSubmitSucces(true);
    } catch (err) {
      setPageError(err as Error);
      console.log(err);
    } finally {
      setTimeout(() => {
        setDefaultOptionForm();
      }, 1000);
    }
  }

  type FieldError = {
    key: string;
    message: string;
    isError: boolean;
  };
  type ErrorResponse = {
    errors: FieldError[];
  };

  function validateForm(formValue: ITaskRequestDto): ErrorResponse {
    const error: ErrorResponse = {
      errors: [],
    };

    if (!formValue.activity?.trim()) {
      error.errors.push({
        key: "activity",
        message: "Activity is required",
        isError: true,
      });
    }

    if (!formValue.dateTimeSelected) {
      error.errors.push({
        key: "dateTimeSelected",
        message: "Date Time is required",
        isError: true,
      });
    }

    return error;
  }

  function setDefaultOptionForm() {
    setFormValue(cloneformValue);
    setFormError({
      errors: [],
    });
    setDateValue(null);
    setSelectedOption(null);
    setInputValue("");
    setKeyword("");
    setOptionList(defaultOptions);
    setIsDisableForm(false);
    setIsSubmitSucces(false);
  }

  function hasError(key: string, error: ErrorResponse): boolean {
    if (error.errors.length < 0) {
      return false;
    }
    return (
      error?.errors?.find((e) => e.key === key && e.isError)?.isError ?? false
    );
  }

  function getErrorMessage(key: string, error: ErrorResponse): string {
    if (error.errors.length < 0) {
      return "";
    }
    return (
      error?.errors?.find((e) => e.key === key && e.isError)?.message ?? ""
    );
  }

  const boxStyle = `
      p-20 flex flex-col justify-center items-center  
       w-full  rounded-xl bg-stone-50  
      shadow-lg shadow-red-50 sm:w-1/2 
      
`;

  React.useEffect(() => {
    const activity = params.get("activity");
    if (!activity) return;

    setInputValue(activity);

    setSelectedOption({ label: activity });

    updateForm("activity", activity);

    setOptionList((prev) => {
      const merged = [{ label: activity }, ...prev];
      return Array.from(new Map(merged.map((x) => [x.label, x])).values());
    });

    setIsDisableForm(true);
  }, [params]);

  return (
    <Fragment>
      {pageError && (
        <ErrorModal
          error={pageError}
          onRetry={() => null}
          onClose={() => setPageError(null)}
        ></ErrorModal>
      )}
      <div className="flex flex-row justify-center items-center">
        <div className={boxStyle}>
          <h1 className="font-bold">CREATE TASK</h1>
          <FormControl className="">
            <div className="mt-5 mb-5">
              <Autocomplete
                disabled={isDisableForm}
                className=""
                disablePortal
                openOnFocus
                getOptionLabel={(o) => o.label}
                value={selectedOption}
                inputValue={inputValue}
                options={optionLists}
                sx={{ width: 300 }}
                getOptionKey={(options) => options.label}
                onChange={(event, value) => {
                  setSelectedOption(value);
                  updateForm("activity", value?.label as string);
                }}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                  setKeyword(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Activity"
                    required={true}
                    error={hasError("activity", formError)}
                    helperText={getErrorMessage("activity", formError)}
                  />
                )}
              />
            </div>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Select Date"
                  value={dateValue}
                  onChange={(dt) => setDateTime(dt)}
                  format="DD/MM/YYYY HH:mm:ss"
                  disablePast
                  sx={{ color: "white" }}
                  slotProps={{
                    textField: {
                      
                      required: true,
                      fullWidth: true,
                      error: hasError("dateTimeSelected", formError),
                      helperText: getErrorMessage(
                        "dateTimeSelected",
                        formError,
                      ),
                    },
                  }}
                />
              </LocalizationProvider>
            </div>

            <div className="mt-5">
              <Button
                type="submit"
                variant="contained"
                onClick={() => submitForm(formValue)}
                className="w-full"
                // disabled={formError}
              >
                CREATE
              </Button>
            </div>
          </FormControl>
        </div>
      </div>
      {isSubmitSuccess && <div className="w-1/2 bg-white">create success</div>}
    </Fragment>
  );
}
