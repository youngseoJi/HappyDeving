import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Content from "./Content.styled";
import "./Map.styled.css";
import { langImg } from "../../static/images/langImg";
import { IoMdArrowDropdown, IoIosSearch } from "react-icons/io";
import { openModal } from "../../features/modal/modalSlice";
import CalenderDate from "../Calendar.js";
import { useDispatch, useSelector } from "react-redux";
import { studyApi } from "../../api/study";
import { useParams } from "react-router-dom";
// import { openModal } from "../../features/modal/modalSlice";
import { dateModal } from "../../features/Search/searchModalSlice";

const WriteStudyDesc = styled.div`
  grid-column: 4/12;
  
  @media screen and (max-width: 1024px) {
    grid-column: 3/13;
    transform: 1s;
  }
  @media screen and (max-width: 768px) {
    grid-column: 2/14;
    transform: 1s;
  }
`;

const Desc = styled(Content)`
  font-family: "Medium";
  padding: 0% 5%;

  input {
    background-color: rgba(233, 193, 255, 20%);
    border-radius: 5px;
    height: 40px;
    width: 100%;
    font-size: 16px;
    padding: 10px;
    height: 50px;
    cursor: pointer;
    @media screen and (max-width: 768px) {
      font-size: 14px;
      width: 100%;
    }
    &:hover {
      outline: none;
      border-bottom: 1px solid #5e17eb;
    }
    &:focus {
      outline: none;
      border-bottom: 1px solid #5e17eb;
    }
  }
`;

const Title = styled.div`
  width: 80%;
  margin: 0 auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 10px;
`;

const TitleText = styled.div`
  font-size: 20px;
  font-family: "Binggrae";
  text-align: center;
`;

const DescDateModal = styled.div`
  width: 100%;
  height: auto;

  text-align: center;
  z-index: 30;
  border-radius: 5px;
  position: absolute;
  top: 50px;
  left: 0px;
  padding: 0px 10px;
  border: 4px solid rgba(250, 240, 255, 100%);
  background: white;
  outline: none;
  &:focus {
    border: 1px solid #5e17eb;
  }
  &:hover {
    cursor: pointer;
    border: 1px solid #5e17eb;
  }
`;

const DescLanguageModal = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  z-index: 30;

  border-radius: 5px;
  position: absolute;
  top: 50px;
  left: 0px;
  padding: 32px 10px;
  border: 4px solid rgba(250, 240, 255, 100%);
  background: white;
  cursor: pointer;
  &:focus {
    border: 1px solid #5e17eb;
  }
  &:hover {
    border: 1px solid #5e17eb;
  }
`;

const DescLocationModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 5px;
  height: auto;
  z-index: 10;
  position: absolute;
  top: 95px;
  left: 0px;
  width: 100%;
  margin: 0 auto;
  font-size: 16px;
  text-align: center;
  padding: 20px;
  border: 4px solid rgba(250, 240, 255, 100%);
  background: white;
  cursor: pointer;

  &:focus {
    border: 1px solid #5e17eb;
  }
  &:hover {
    border: 1px solid #5e17eb;
  }
`;

const HalfInput = styled.div`
  display: flex;
  background-color: rgba(233, 193, 255, 20%);
  border-radius: 5px;
  position: relative;
  width: 100%;
  height: 50px;
  font-size: 16px;
  padding: 5px 10px;

  align-items: center;
  cursor: pointer;
  &:hover {
    outline: none;
    border-bottom: 1px solid #5e17eb;
  }
  &:focus {
    outline: none;
    border-bottom: 1px solid #5e17eb;
  }
  @media screen and (max-width: 768px) {
    font-size: 16px;
    width: 100%;
  }
`;

const LangDrop = styled.div`
  position: absolute;
  border-left: 1px solid darkgray;
  right: 0px;
  top: 8px;
  font-size: 34px;
  color: #5e17eb;
  padding: 0px 2px;
  cursor: pointer;
`;

const DateDrop = styled.div`
  position: absolute;
  border-left: 1px solid darkgray;
  right: 0px;
  top: 8px;
  font-size: 34px;
  color: #5e17eb;
  padding: 0px 2px;
  cursor: pointer;
`;
const IconSerch = styled.div`
  position: absolute;
  right: 0px;
  top: 55px;
  border-left: 1px solid darkgray;
  font-size: 30px;
  color: #5e17eb;
  padding: 0px 5px;
  /* padding: 5px 10px; */
  cursor: pointer;
`;

const RowWrap = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 20px;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const HalfWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0px;
  width: 45%;
  position: relative;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  width: 100%;
  position: relative;
`;

const Text = styled.div`
  font-family: "Binggrae";
  font-size: 18px;
  margin: 10px 0px;
  @media screen and (max-width: 1024px) {
    font-size: 16px;
  }
`;

const ConfirmButton = styled.button`
  display: flex;
  font-family: "Binggrae";
  justify-content: center;
  width: 150px;
  padding: 5px 5px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #5e17eb;
  font-size: 14px;
  transition: 1ms;
  &:hover {
    color: #5e17eb;
    font-weight: 600;
    background-color: rgba(233, 193, 255, 10%);
    position: relative;
    top: -2px;
  }
  &:active {
    position: relative;
    top: 0px;
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(233, 193, 255, 20%);
  width: 100%;
  height: 200px;
  /* outline: none; */
  &:hover {
    outline: none;
    border-bottom: 1px solid #5e17eb;
  }
  &:focus {
    outline: none;
    border-bottom: 1px solid #5e17eb;
  }
`;

const { kakao } = window;

const MapView = styled(Content)`
  border-radius: 0px;
  grid-column: 2/14;
  height: 300px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const Closed = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    margin-left: 10px;
    width: 18px;
  }
`;
const Checkbox = styled.div`
  display: flex;
  align-items: center;
`;

const EditStudyDesc = () => {
  const dispatch = useDispatch();

  const container = useRef(null);
  const locationInput = useRef(null);

  const { dateData } = useSelector((store) => store.searchData);
  const { calenderDateValue } = useSelector((store) => store.calender);
  const { isError, message } = useSelector((state) => state.allStudies);

  const [location, setLocation] = useState({
    name: "광화문",
    latitude: 37.570975,
    longitude: 126.977759,
  });

  const [locationList, setLocationList] = useState([]);
  const { date } = useSelector((store) => store.search);
  const [lang, setLang] = useState([{ id: 6, name: "react" }]);
  const [open, setOpen] = useState({
    language: false,
    date: false,
    location: false,
  });

  const [data, setData] = useState(null);
  const [checked, setChecked] = useState(false);

  var ps = new kakao.maps.services.Places();

  // 키워드 검색을 요청하는 함수입니다
  function searchPlaces(value) {
    var keyword = value;
    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      alert("키워드를 입력해주세요!");
      return false;
    }
    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    return ps.keywordSearch(keyword, placesSearchCB);
  }

  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
  function placesSearchCB(data, status) {
    if (status === kakao.maps.services.Status.OK) {
      setLocationList(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
      return;
    }
  }

  const handleLocationValue = (e, value) => {
    if (e.type === "click" || e.key === "Enter") {
      searchPlaces(value);
    }
  };

  const mapscript = () => {
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(location.y, location.x), //지도의 중심좌표
      level: 5, //지도의 레벨(확대, 축소 정도)
    };

    var map = new kakao.maps.Map(container.current, options);

    var // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(65, 65), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(27, 69) };
    // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    var img = langImg[lang[0]["name"]];


    var marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(location.y, location.x),
      image: new kakao.maps.MarkerImage(img, imageSize, imageOption),
    });
    //marker 만들기

    //marker 배열 내용을 하나씩 넣어서 만드는 과정

    marker.setClickable(true);
    marker.getClickable(true);
    // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다

    //el.id 스터디 아이디가 담겨온다.
  };

  // const href = document.location.href.split("/");
  // const id  = href[href.length - 1];
  const { id } = useParams();

  useEffect(() => {
    studyApi(id).then((res) => {
      const {
        id,
        title,
        content,
        kakaoLink,
        closed,
        location,
        language,
        startDate,
        //배열이여야 할듯
      } = res.data.data.study;

      setData({
        id,
        title,
        content,
        kakaoLink,
        closed,
        startDate,
        language,
      });

      setLang(language);

      setLocation({
        y: location.latitude,
        x: location.longitude,
        place_name: location.name,
      });

      //location이 된다음에 해야 한다
    });
  }, [id]);

  useEffect(() => {
    if (data) {
      mapscript();
    }
  }, [data]);

  useEffect(() => {
    setData({ ...data, startDate: dateData });
  }, [dateData]);

  const locationListHandler = (locationList) => {
    //검색한 조건에 맞는 스터디들의 목록을 div로 표현
    //return 문에서 사용해줘야 함

    //검색한 리스트의 장소 이름으로 목록 변경
    //중복 제외
    return locationList.map((location, idx) => (
      <div
        key={idx}
        onClick={() => {
          setLocation(location);
          const gu = location.address_name
            .split(" ")
            .filter((el) => el[el.length - 1] === "구")[0];
          const dong = location.address_name
            .split(" ")
            .filter((el) => el[el.length - 1] === "동")[0];
          setData({
            ...data,
            location: [location.y, location.x, gu, dong, location.place_name],
          });
          //클릭한 장소로 location 새로 세팅
          locationInput.current.value = location.place_name;
          setOpen({ ...open, location: false });
        }}
      >
        {location.place_name}
      </div>
    ));
  };

  const handleInputValue = (id, e) => {
    setData({ ...data, [id]: e });
  };

  const handleUpdateStudy = async (e) => {
    e.preventDefault();
    if (isError) {
      console.log("editStudy.rejected :", message);
    }
    dispatch(
      openModal({ name: "UpdateStudy", childrenProps: { id, ...data } })
    );
  };

  return (
    <>
      {data ? (
        <>
          <WriteStudyDesc>
            <Desc>
              <Title>
                <TitleText>스터디 글 수정하기</TitleText>
              </Title>
              <Wrapper>
                <Text>제목</Text>
                <input
                  defaultValue={data.title}
                  onChange={(e) => handleInputValue("title", e.target.value)}
                ></input>
              </Wrapper>
              <RowWrap>
                <HalfWrapper>
                  <Text>스터디 시작일</Text>
                  <HalfInput defaultValue={calenderDateValue}>
                    {dateData ? calenderDateValue : calenderDateValue}
                    <DateDrop>
                      <IoMdArrowDropdown onClick={() => setOpen({ ...open, date: !open.date })} />
                    </DateDrop>
                    {open.date ? (
                      <DescDateModal>
                        <CalenderDate />
                      </DescDateModal>
                    ) : null}
                  </HalfInput>
                </HalfWrapper>
                <HalfWrapper>
                  <Text classNane="lanaguage">학습 언어</Text>
                  <HalfInput>
                    {data.language?.map((el) => el.name).join()}
                    <DateDrop>
                      <IoMdArrowDropdown
                        onClick={() => setOpen({ ...open, language: !open.language })}
                      />
                    </DateDrop>
                    {open.language ? (
                      <DescLanguageModal>
                        <div>
                          {Object.keys(langImg).map((el, idx) => (
                            <div
                              key={idx}
                              className="elements"
                              onClick={() => {
                                if (data.language.filter((obj) => obj.name === el).length === 0) {
                                  setData({
                                    ...data,

                                    language: [
                                      ...data.language,
                                      {
                                        id: idx + 1,
                                        name: el,
                                      },
                                    ],
                                  });
                                }
                                setOpen({ ...open, language: false });
                              }}
                            >
                              {el}
                            </div>
                          ))}
                        </div>
                      </DescLanguageModal>
                    ) : null}
                  </HalfInput>
                </HalfWrapper>
              </RowWrap>
              <Wrapper>
                <Text>스터디 참여 링크</Text>
                <input
                  placeholder="ex. 카카오톡 오픈채팅 링크"
                  onChange={(e) => handleInputValue("kakaoLink", e.target.value)}

                  defaultValue={data.kakaoLink}
                ></input>
              </Wrapper>

              <Wrapper>
                <Text>스터디 장소</Text>
                <input
                  className="locaitionInput"
                  placeholder="ex. 신촌역 4번 출구"
                  onKeyDown={(e) => {
                    handleLocationValue(e, e.target.value);
                  }}
                  defaultValue={location.place_name}
                  ref={locationInput}
                ></input>
                {open.location ? (
                  <DescLocationModal>
                    {locationListHandler(locationList)}
                  </DescLocationModal>
                ) : null}
                <IconSerch>
                  <IoIosSearch
                    className="icon"
                    onClick={(locationInput) => {
                      console.log(locationInput.target.value);
                      setOpen({ ...open, location: true });
                    }}
                  />
                </IconSerch>
              </Wrapper>
              <MapView id="map" ref={container} />
              <Wrapper>
                <Text>내용</Text>
                <Textarea
                  onChange={(e) => handleInputValue("content", e.target.value)}
                  defaultValue={data.content}
                ></Textarea>
              </Wrapper>

              <Closed>
                <Checkbox>
                  <label htmlFor="closed">스터디 모집마감</label>
                  <input
                    type="checkbox"
                    checked={data.closed ? "checked" : null}
                    onClick={() => {
                      setChecked(!checked);
                      setData({ ...data, closed: checked });
                    }}
                  ></input>
                </Checkbox>
                <ConfirmButton onClick={handleUpdateStudy}>수정완료</ConfirmButton>
              </Closed>
            </Desc>
          </WriteStudyDesc>
        </>
      ) : null}
    </>
  );
};

export default EditStudyDesc;
