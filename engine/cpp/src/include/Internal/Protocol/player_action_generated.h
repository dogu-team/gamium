// automatically generated by the FlatBuffers compiler, do not modify


#ifndef FLATBUFFERS_GENERATED_PLAYERACTION_GAMIUM_PROTOCOL_PACKETS_ACTIONS_H_
#define FLATBUFFERS_GENERATED_PLAYERACTION_GAMIUM_PROTOCOL_PACKETS_ACTIONS_H_

#include "flatbuffers/flatbuffers.h"

// Ensure the included flatbuffers.h is the same version as when this file was
// generated, otherwise it may not be compatible.
static_assert(FLATBUFFERS_VERSION_MAJOR == 22 &&
              FLATBUFFERS_VERSION_MINOR == 10 &&
              FLATBUFFERS_VERSION_REVISION == 26,
             "Non-compatible flatbuffers version included");

#include "object_generated.h"
#include "vector_generated.h"

namespace Gamium {
namespace Protocol {
namespace Packets {
namespace Actions {

struct MovePlayerParam;
struct MovePlayerParamBuilder;
struct MovePlayerParamT;

inline const flatbuffers::TypeTable *MovePlayerParamTypeTable();

enum class MovePlayerBy : int16_t {
  KeyPress = 0,
  Navigation = 1,
  MIN = KeyPress,
  MAX = Navigation
};

inline const MovePlayerBy (&EnumValuesMovePlayerBy())[2] {
  static const MovePlayerBy values[] = {
    MovePlayerBy::KeyPress,
    MovePlayerBy::Navigation
  };
  return values;
}

inline const char * const *EnumNamesMovePlayerBy() {
  static const char * const names[3] = {
    "KeyPress",
    "Navigation",
    nullptr
  };
  return names;
}

inline const char *EnumNameMovePlayerBy(MovePlayerBy e) {
  if (flatbuffers::IsOutRange(e, MovePlayerBy::KeyPress, MovePlayerBy::Navigation)) return "";
  const size_t index = static_cast<size_t>(e);
  return EnumNamesMovePlayerBy()[index];
}

struct MovePlayerParamT : public flatbuffers::NativeTable {
  typedef MovePlayerParam TableType;
  std::string player_object_id{};
  std::string camera_object_id{};
  Gamium::Protocol::Types::Vector3 position{};
  Gamium::Protocol::Packets::Actions::MovePlayerBy by = Gamium::Protocol::Packets::Actions::MovePlayerBy::KeyPress;
  float epsilon = 0.0f;
  bool check_height = false;
};

struct MovePlayerParam FLATBUFFERS_FINAL_CLASS : private flatbuffers::Table {
  typedef MovePlayerParamT NativeTableType;
  typedef MovePlayerParamBuilder Builder;
  static const flatbuffers::TypeTable *MiniReflectTypeTable() {
    return MovePlayerParamTypeTable();
  }
  enum FlatBuffersVTableOffset FLATBUFFERS_VTABLE_UNDERLYING_TYPE {
    VT_PLAYER_OBJECT_ID = 4,
    VT_CAMERA_OBJECT_ID = 6,
    VT_POSITION = 8,
    VT_BY = 10,
    VT_EPSILON = 12,
    VT_CHECK_HEIGHT = 14
  };
  const flatbuffers::String *player_object_id() const {
    return GetPointer<const flatbuffers::String *>(VT_PLAYER_OBJECT_ID);
  }
  const flatbuffers::String *camera_object_id() const {
    return GetPointer<const flatbuffers::String *>(VT_CAMERA_OBJECT_ID);
  }
  const Gamium::Protocol::Types::Vector3 *position() const {
    return GetStruct<const Gamium::Protocol::Types::Vector3 *>(VT_POSITION);
  }
  Gamium::Protocol::Packets::Actions::MovePlayerBy by() const {
    return static_cast<Gamium::Protocol::Packets::Actions::MovePlayerBy>(GetField<int16_t>(VT_BY, 0));
  }
  float epsilon() const {
    return GetField<float>(VT_EPSILON, 0.0f);
  }
  bool check_height() const {
    return GetField<uint8_t>(VT_CHECK_HEIGHT, 0) != 0;
  }
  bool Verify(flatbuffers::Verifier &verifier) const {
    return VerifyTableStart(verifier) &&
           VerifyOffset(verifier, VT_PLAYER_OBJECT_ID) &&
           verifier.VerifyString(player_object_id()) &&
           VerifyOffset(verifier, VT_CAMERA_OBJECT_ID) &&
           verifier.VerifyString(camera_object_id()) &&
           VerifyField<Gamium::Protocol::Types::Vector3>(verifier, VT_POSITION, 4) &&
           VerifyField<int16_t>(verifier, VT_BY, 2) &&
           VerifyField<float>(verifier, VT_EPSILON, 4) &&
           VerifyField<uint8_t>(verifier, VT_CHECK_HEIGHT, 1) &&
           verifier.EndTable();
  }
  MovePlayerParamT *UnPack(const flatbuffers::resolver_function_t *_resolver = nullptr) const;
  void UnPackTo(MovePlayerParamT *_o, const flatbuffers::resolver_function_t *_resolver = nullptr) const;
  static flatbuffers::Offset<MovePlayerParam> Pack(flatbuffers::FlatBufferBuilder &_fbb, const MovePlayerParamT* _o, const flatbuffers::rehasher_function_t *_rehasher = nullptr);
};

struct MovePlayerParamBuilder {
  typedef MovePlayerParam Table;
  flatbuffers::FlatBufferBuilder &fbb_;
  flatbuffers::uoffset_t start_;
  void add_player_object_id(flatbuffers::Offset<flatbuffers::String> player_object_id) {
    fbb_.AddOffset(MovePlayerParam::VT_PLAYER_OBJECT_ID, player_object_id);
  }
  void add_camera_object_id(flatbuffers::Offset<flatbuffers::String> camera_object_id) {
    fbb_.AddOffset(MovePlayerParam::VT_CAMERA_OBJECT_ID, camera_object_id);
  }
  void add_position(const Gamium::Protocol::Types::Vector3 *position) {
    fbb_.AddStruct(MovePlayerParam::VT_POSITION, position);
  }
  void add_by(Gamium::Protocol::Packets::Actions::MovePlayerBy by) {
    fbb_.AddElement<int16_t>(MovePlayerParam::VT_BY, static_cast<int16_t>(by), 0);
  }
  void add_epsilon(float epsilon) {
    fbb_.AddElement<float>(MovePlayerParam::VT_EPSILON, epsilon, 0.0f);
  }
  void add_check_height(bool check_height) {
    fbb_.AddElement<uint8_t>(MovePlayerParam::VT_CHECK_HEIGHT, static_cast<uint8_t>(check_height), 0);
  }
  explicit MovePlayerParamBuilder(flatbuffers::FlatBufferBuilder &_fbb)
        : fbb_(_fbb) {
    start_ = fbb_.StartTable();
  }
  flatbuffers::Offset<MovePlayerParam> Finish() {
    const auto end = fbb_.EndTable(start_);
    auto o = flatbuffers::Offset<MovePlayerParam>(end);
    return o;
  }
};

inline flatbuffers::Offset<MovePlayerParam> CreateMovePlayerParam(
    flatbuffers::FlatBufferBuilder &_fbb,
    flatbuffers::Offset<flatbuffers::String> player_object_id = 0,
    flatbuffers::Offset<flatbuffers::String> camera_object_id = 0,
    const Gamium::Protocol::Types::Vector3 *position = nullptr,
    Gamium::Protocol::Packets::Actions::MovePlayerBy by = Gamium::Protocol::Packets::Actions::MovePlayerBy::KeyPress,
    float epsilon = 0.0f,
    bool check_height = false) {
  MovePlayerParamBuilder builder_(_fbb);
  builder_.add_epsilon(epsilon);
  builder_.add_position(position);
  builder_.add_camera_object_id(camera_object_id);
  builder_.add_player_object_id(player_object_id);
  builder_.add_by(by);
  builder_.add_check_height(check_height);
  return builder_.Finish();
}

flatbuffers::Offset<MovePlayerParam> CreateMovePlayerParam(flatbuffers::FlatBufferBuilder &_fbb, const MovePlayerParamT *_o, const flatbuffers::rehasher_function_t *_rehasher = nullptr);

inline MovePlayerParamT *MovePlayerParam::UnPack(const flatbuffers::resolver_function_t *_resolver) const {
  auto _o = std::unique_ptr<MovePlayerParamT>(new MovePlayerParamT());
  UnPackTo(_o.get(), _resolver);
  return _o.release();
}

inline void MovePlayerParam::UnPackTo(MovePlayerParamT *_o, const flatbuffers::resolver_function_t *_resolver) const {
  (void)_o;
  (void)_resolver;
  { auto _e = player_object_id(); if (_e) _o->player_object_id = _e->str(); }
  { auto _e = camera_object_id(); if (_e) _o->camera_object_id = _e->str(); }
  { auto _e = position(); if (_e) _o->position = *_e; }
  { auto _e = by(); _o->by = _e; }
  { auto _e = epsilon(); _o->epsilon = _e; }
  { auto _e = check_height(); _o->check_height = _e; }
}

inline flatbuffers::Offset<MovePlayerParam> MovePlayerParam::Pack(flatbuffers::FlatBufferBuilder &_fbb, const MovePlayerParamT* _o, const flatbuffers::rehasher_function_t *_rehasher) {
  return CreateMovePlayerParam(_fbb, _o, _rehasher);
}

inline flatbuffers::Offset<MovePlayerParam> CreateMovePlayerParam(flatbuffers::FlatBufferBuilder &_fbb, const MovePlayerParamT *_o, const flatbuffers::rehasher_function_t *_rehasher) {
  (void)_rehasher;
  (void)_o;
  struct _VectorArgs { flatbuffers::FlatBufferBuilder *__fbb; const MovePlayerParamT* __o; const flatbuffers::rehasher_function_t *__rehasher; } _va = { &_fbb, _o, _rehasher}; (void)_va;
  auto _player_object_id = _o->player_object_id.empty() ? _fbb.CreateSharedString("") : _fbb.CreateString(_o->player_object_id);
  auto _camera_object_id = _o->camera_object_id.empty() ? _fbb.CreateSharedString("") : _fbb.CreateString(_o->camera_object_id);
  auto _position = &_o->position;
  auto _by = _o->by;
  auto _epsilon = _o->epsilon;
  auto _check_height = _o->check_height;
  return Gamium::Protocol::Packets::Actions::CreateMovePlayerParam(
      _fbb,
      _player_object_id,
      _camera_object_id,
      _position,
      _by,
      _epsilon,
      _check_height);
}

inline const flatbuffers::TypeTable *MovePlayerByTypeTable() {
  static const flatbuffers::TypeCode type_codes[] = {
    { flatbuffers::ET_SHORT, 0, 0 },
    { flatbuffers::ET_SHORT, 0, 0 }
  };
  static const flatbuffers::TypeFunction type_refs[] = {
    Gamium::Protocol::Packets::Actions::MovePlayerByTypeTable
  };
  static const flatbuffers::TypeTable tt = {
    flatbuffers::ST_ENUM, 2, type_codes, type_refs, nullptr, nullptr, nullptr
  };
  return &tt;
}

inline const flatbuffers::TypeTable *MovePlayerParamTypeTable() {
  static const flatbuffers::TypeCode type_codes[] = {
    { flatbuffers::ET_STRING, 0, -1 },
    { flatbuffers::ET_STRING, 0, -1 },
    { flatbuffers::ET_SEQUENCE, 0, 0 },
    { flatbuffers::ET_SHORT, 0, 1 },
    { flatbuffers::ET_FLOAT, 0, -1 },
    { flatbuffers::ET_BOOL, 0, -1 }
  };
  static const flatbuffers::TypeFunction type_refs[] = {
    Gamium::Protocol::Types::Vector3TypeTable,
    Gamium::Protocol::Packets::Actions::MovePlayerByTypeTable
  };
  static const flatbuffers::TypeTable tt = {
    flatbuffers::ST_TABLE, 6, type_codes, type_refs, nullptr, nullptr, nullptr
  };
  return &tt;
}

}  // namespace Actions
}  // namespace Packets
}  // namespace Protocol
}  // namespace Gamium

#endif  // FLATBUFFERS_GENERATED_PLAYERACTION_GAMIUM_PROTOCOL_PACKETS_ACTIONS_H_
